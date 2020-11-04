[33mcommit 196bce0ff9d6f3ac958aba5284cefc90a7a8793e[m[33m ([m[1;36mHEAD -> [m[1;32msetting_view_update[m[33m)[m
Author: Robbie Bagley <rbagley01@gmail.com>
Date:   Mon Nov 2 16:58:07 2020 -0700

    temp

[33mcommit bf9045533d5b58ed427bea8ede12be5ba4db5a8a[m[33m ([m[1;31morigin/setting_view_update[m[33m)[m
Author: Robbie Bagley <rbagley01@gmail.com>
Date:   Sun Nov 1 23:40:46 2020 -0700

    Resolved all comments for the PR

[33mcommit 1892b718252ba73368ea4a3d728d27e04c5ac23d[m
Author: Robbie Bagley <rbagley01@gmail.com>
Date:   Sat Oct 31 16:59:14 2020 -0700

    Improved settings view and added user cards and groups

[33mcommit f9f24ff69d02142046ab02ab1cddf04207539f1e[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Wed Oct 14 17:09:55 2020 -0700

    Updated styles with React-Native-Element components (#18)
    
    * added logo
    * Improved sample database text messages
    * Added Icons

[33mcommit 9866602e6f7feb2140e40846981da980bcd13273[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Wed Oct 14 13:11:01 2020 -0700

    Update message list (#16)
    
    * implemented KeyboardAwareScrollView
    
    * added different styles for self/other messages. in store/index.js renamed message values from (id, value) to (id, message, author, created). Set dummy values for author/created
    
    * Needs fix: fontsize on username/timestamp, timestamp alignment
    
    * Fixed input bar to work with iphone
    
    Co-authored-by: bradleyyolson <braddleyolson@email.arizona.edu>
    Co-authored-by: bradleyyolson <bradleyyolson@email.arizona.edu>

[33mcommit 85097417419bd10d802ba8f1e1bf006cf269a933[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Mon Oct 12 20:52:48 2020 -0700

    Added server client connection using WebSockets (#12)
    
    * Lets users setup their own individual databases
    * Contains Instructions for setting up the server and client
    * Updates messages in realtime through the server
    * Ability to change between chats

[33mcommit 4b0dea239f37a016097c3ded24d2258487b14e94[m
Author: Robbie Bagley <39345139+kansairob@users.noreply.github.com>
Date:   Mon Oct 12 19:22:22 2020 -0700

    Added login form (#17)
    
    * Edited the LoginView
    * Password can now be hidden when entered by user
    * added isValid flag

[33mcommit 4c91c6773cd80b59a0e5b2cd0ab63810ac850f75[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Mon Oct 12 16:49:21 2020 -0700

    Revert "Update message list (#13)" (#15)
    
    This reverts commit f97c968a89706e3ed3aa7941560159f9df7dcbe2.

[33mcommit f97c968a89706e3ed3aa7941560159f9df7dcbe2[m
Author: bradleyyolson <31676652+bradleyyolson@users.noreply.github.com>
Date:   Mon Oct 12 15:48:48 2020 -0700

    Update message list (#13)
    
    * implemented KeyboardAwareScrollView
    
    * added different styles for self/other messages. in store/index.js renamed message values from (id, value) to (id, message, author, created). Set dummy values for author/created
    
    Co-authored-by: bradleyyolson <braddleyolson@email.arizona.edu>

[33mcommit 1b21bc07b2190d0a6cdf4080e8749f1d527f91b9[m[33m ([m[1;31morigin/Kaz-Settings-Screen-Second-Attempt[m[33m)[m
Author: KazyManazy <KazyManazy>
Date:   Mon Oct 12 14:59:08 2020 -0700

    Completely removed flatlist and debug file

[33mcommit 6148c3d2d46c96c76ee5b1d475588ab5ed11a12f[m
Author: KazyManazy <KazyManazy>
Date:   Sun Oct 11 12:09:20 2020 -0700

    Fixed up the group stuff

[33mcommit d7f9e34a47eece2964f702fb04718540c090aa7f[m
Author: KazyManazy <KazyManazy>
Date:   Sun Oct 11 11:14:08 2020 -0700

    Added all the button functionality requested

[33mcommit 481186c45030a6a07181ee876cfc10c1ae7db1b7[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Sun Oct 4 16:42:36 2020 -0700

    Added redux commands to all views (#11)

[33mcommit a7836c57a0d840ddad7fde6a0e30356a9742d565[m
Author: KazyManazy <51599522+KazyManazy@users.noreply.github.com>
Date:   Sun Oct 4 13:34:21 2020 -0700

    Added the settings screen (#10)
    
    Co-authored-by: KazyManazy <KazyManazy>

[33mcommit b1e49d0c3a2ebc70d8469d92176bf0dfbfb2b3f1[m
Author: bradleyyolson <31676652+bradleyyolson@users.noreply.github.com>
Date:   Sun Oct 4 12:09:45 2020 -0700

    Brad - Improve messages screen appearance (#9)
    
    * text bar stays on bottom, text bar clears on send message
    
    * Made message boxes look a little nicer. To be further adjusted.
    
    Co-authored-by: bradleyyolson <braddleyolson@email.arizona.edu>

[33mcommit 38586513deff60e99d94870621b3f60ceba30dc3[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Fri Oct 2 23:24:23 2020 -0700

    Added navigation between login, messages, sidemenu, & settings (#8)
    
    @kansairob helped with setting up navigator

[33mcommit 2e5c093f6919fe3a228afc934e6f5e016d896bd8[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Wed Sep 30 18:37:24 2020 -0700

    Add Authentication to Django (#5)
    
    * Implemented route authentication
    * overwrote root django user model
    * Added login, registration
    * Added install steps for server

[33mcommit f7bdf94361af5259e59050ec59449fb4307fa0ad[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Wed Sep 30 18:30:05 2020 -0700

    Added fake data used for implementing functionality locally (#7)

[33mcommit 9537e68c93b95aaab62a12d846cc5fc87dacc755[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Sun Sep 27 13:55:00 2020 -0700

    Added global state store to store variables throughout the app (#4)

[33mcommit 43cbc15b73f779d716c49fe10769c9073e66f07b[m
Author: Robbie Bagley <39345139+kansairob@users.noreply.github.com>
Date:   Tue Sep 22 19:10:57 2020 -0700

    Fixed message component (#2)

[33mcommit 676bcf292c8012e030983920790276a8e704c7d6[m
Author: Andrew Raftovich <AndrewRaftovich@gmail.com>
Date:   Sun Sep 20 14:50:52 2020 -0700

    Added Page Navigator (#1)

[33mcommit 2388bc7cddd6e5b5852215420d9de06fc4e87e04[m
Author: kalatco <andrewraftovich@gmail.com>
Date:   Sat Sep 19 16:15:58 2020 -0700

    Updated install steps

[33mcommit 7630f00063ef8a0150d98f0e042dc617e6283ba9[m
Author: kalatco <andrewraftovich@gmail.com>
Date:   Sat Sep 19 16:02:03 2020 -0700

    Added Django source files

[33mcommit 1b623d21b90917ec86da21df3b2c048cb7614a22[m
Author: kalatco <andrewraftovich@gmail.com>
Date:   Sat Sep 19 15:56:06 2020 -0700

    Created a new Expo app
