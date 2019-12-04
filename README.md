# YU Kaltura Media Package

"YU Kaltura Media Package" is a third-party's Kaltura plugin package (a series of plugins) for Moodle 2.9 or later.
This package is developed by the Media and Information Technology Center, Yamaguchi University.
By using this package, users can upload media to the Kaltura server, and easily embed the media in Moodle courses.
Moreover, this package provides some useful functions.
Since this package does not require Kaltura Application Framework (KAF), can work with Kaltura Community Edition (CE) and other editions.

In order to use this package, administrators must install "[YU Kaltura Media Local Libraries](https://moodle.org/plugins/local_kaltura)" and "[YU Kaltura Media Gallery](https://moodle.org/plugins/local_mymedia)".
These plugins provide functions such as uploading, playing back and deleting media files to users.

In addition, the administrators can install "[YU Kaltura Media Assignment](https://moodle.org/plugins/mod_kalmediaassign)", "[YU Kaltura Media Resource](https://moodle.org/plugins/mod_kalmediares)", and "[YU Kaltura Media for Atto](https://moodle.org/plugins/atto_kaltura)".
These plugins provide teachers ability of creating resource and activity modules which use kaltura media in their Moodle courses.
And, user can embed his/her media into text area (introduction or page content) through the Atto HTML editor.

Please note that there is a chance this module will not work on some Moodle environment.
Also, this package is only available in English and Japanese. Stay tuned to future versions for other language supports.

Original plugin package ("Kaltura Video Package") has better functions than ours and is easy to use. So that, for customers of the "Kaltura SaaS Edition", use the original plugin package is the better.

YU Kaltura Media for Atto
------

This is a sub-plugin for the Atto HTML editor.
By using this plugin, users can embed Kaltura media into text content.
For example, introduction of resource/activity content, page content, label content, report as online text, feedback comment, etc.
Users can embed existing Kaltura media into text area of the Atto.
In addition, they can upload new media and can embed it.
For PCs, users can record new media by using a webcam, and can upload the media.
Then, they can embed the media into text area of the Atto.

This plugin is updated with stable releases. To follow active development on GitHub, click [here](https://github.com/YU-MITC/moodle-atto_kaltura/).

Requirements
------

* PHP5.3 or greater.
* Web browsers must support the JavaScript and HTML5.
* System administrators must use the HTTPS protocol for their Moodle site and Kaltura server.
* Administrators must not delete "Default" access control profile from their Kaltura server. If they delete the "Default" profile, they must create new profile named "Default" before install our plugins.
* These plugins do not support Flash players. Therefore, please use HTML5 players.
* "local_kaltura" and "local_mymedia" plugins.

Supported themes
-----

* Clean
* Boost (version 1.1.7 and later)
* Classic (version 1.3.0 and later)

This plugin package might be able to work with other themes.

Installation
------

Unzip this plugin, and copy the directory (lib/editor/atto/plugins/kaltura) under moodle root directory (ex. /moodle).
Installation will be completed after you log in as an administrator and access the notification menu.

After installation, the administrator must access setting page of local_kaltura, and must set some items for this plugin.
Next, the administrator must access setting page of the Atto HTML editor, and must add "kaltura" keyword to toolbar's setting.

How to use
------

* User's guide, click [here](http://www.cc.yamaguchi-u.ac.jp/guides/cas/plugins/userguide_version1.4.pdf).
* Demonstration web page, click [here](http://www.cc.yamaguchi-u.ac.jp/guides/cas/plugins/demo/).

Targeted Moodle versions
------

Moodle 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8

Branches
------

* MOODLE_29_STABLE -> Moodle2.9 branch
* MOODLE_30_STABLE -> Moodle3.0 branch
* MOODLE_31_STABLE -> Moodle3.1 branch
* MOODLE_32_STABLE -> Moodle3.2 branch
* MOODLE_33_STABLE -> Moodle3.3 branch
* MOODLE_34_STABLE -> Moodle3.4 branch
* MOODLE_35_STABLE -> Moodle3.5 branch
* MOODLE_36_STABLE -> Moodle3.6 branch
* MOODLE_37_STABLE -> Moodle3.7 branch
* MOODLE_38_STABLE -> Moodle3.8 branch

First clone the repository with "git clone", then "git checkout MOODLE_29_STABLE(branch name)" to switch branches.

Warning
------

* We are not responsible for any problem caused by this software. 
* This software follows the license policy of Moodle (GNU GPL v3).
* "Kaltura" is the registered trademark of the Kaltura Inc.
* Web-camera recording function supports the Mozilla Firefox, Google Chrome, Opera and Safari. For smartphones and tablets, you can record movies through a normal media uploader.
* Uploading and recording functions in resource and activity modules may not work well with smartphones. Because, low resolution screen cannot display these forms correctly.

Change log of YU Kaltura Media for Atto
------

Version 1.4.0

* fixed javascript files based on JSDoc warnings.
* fixed javascript files in order to support the Safari 12.x/13.x on macOS.
* added privacy functions ans strings to comply with GDPR.
* fixed "Requirements" in README.md.

Version 1.0.4

* fixed some statements in attoselector.js, in order to according to the Moodle coding style.

Version 1.0.3

* fixed some statements in attorecorder.js, and button.js, in order to according to the Moodle coding style.

Version 1.0.2

* fixed some statements in attorecorder.js, attouploader.js, and button.js, in order to according to the Moodle coding style.

Version 1.0.1

* fixed comments in attorecorder.js, attouploader.js, atto_recorder.php, and atto_uploader.php

Version 1.0.0

* released first version.

