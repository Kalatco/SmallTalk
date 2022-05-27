from django.test import TestCase
from .models import Group, Chat, Message, Account
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

'''
    Testing: python manage.py test
'''

class MessengerTestCase(TestCase):
    account_one = None
    account_two = None
    group_one = None
    chat_room = None


    def setUp(self):
        # Create user accounts
        self.account_one = Account.objects.create_user(
            email='email1@email.com',
            username='test1',
            password='SecurePassword',
            first_name='first',
            last_name='last'
        )

        self.account_two = Account.objects.create_user(
            email='email2@email.com',
            username='test2',
            password='SecurePassword',
            first_name='first',
            last_name='last'
        )

        # Create a group
        self.group_one = Group.objects.create(
            admin=self.account_one,
            name='First Group!'
        )
        self.group_one.users.add(self.account_one)
        self.group_one.users.add(self.account_two)

        # Create a chat room
        self.chat_room = Chat.objects.create(
            group=self.group_one,
            name='First Chat!'
        )

        Message.objects.create(
            sender=self.account_two,
            chat=self.chat_room,
            text='A new message'
        )


    def test_user_api(self):

        token = Token.objects.get(user__username=self.account_one.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.get('/api/user')

        self.assertEqual(response.data['group_list'][0]['name'], self.group_one.name)
        self.assertEqual(response.data['email'], self.account_one.email)
        self.assertEqual(response.data['username'], self.account_one.username)


    def test_user_registration(self):
        user_email = 'test3@email.com'
        user_username = 'test3'
        user_password = 'SecurePassword'
        user_first_name = 'firstName'
        user_last_name = 'lastName'

        client = APIClient()
        response = client.post('/register',
            {
                'email': user_email,
                'username': user_username,
                'password': user_password,
                'password2': user_password,
                'first_name': user_first_name,
                'last_name': user_last_name
            })

        self.assertTrue(response.status_code == 200)

        account = Account.objects.get(username=user_username)

        self.assertEqual(account.first_name, user_first_name)
        self.assertEqual(account.last_name, user_last_name)
        self.assertEqual(account.email, user_email)
        self.assertTrue(account.check_password(user_password))


    def test_update_user(self):
        new_firstname = 'Jimothy'
        new_lastname = 'Lastname'
        new_password = 'UpdatedPassword'

        token = Token.objects.get(user__username=self.account_one.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.put('/api/user/update',
            {
                'old_password': 'SecurePassword',
                'first_name': new_firstname,
                'last_name': new_lastname,
                'new_password': new_password,
                'new_password2': new_password
            })

        self.account_one.refresh_from_db()
        self.assertEqual(self.account_one.first_name, "wrong assert value")
        self.assertEqual(self.account_one.last_name, new_lastname)
        self.assertTrue(self.account_one.check_password(new_password))


    def test_invalid_update_user(self):
        new_firstname = 'Jimothy'

        token = Token.objects.get(user__username=self.account_one.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.put('/api/user/update',
            {
                'old_password': 'WrongPassword',
                'first_name': new_firstname,
            })

        self.assertTrue(response.status_code == 400)
        self.account_one.refresh_from_db()
        self.assertNotEqual(self.account_one.first_name, new_firstname)
