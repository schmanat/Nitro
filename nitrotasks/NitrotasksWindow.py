# -*- Mode: Python; coding: utf-8; indent-tabs-mode: nil; tab-width: 4 -*-
### BEGIN LICENSE
# This file is in the public domain
### END LICENSE

import gettext
from gettext import gettext as _
gettext.textdomain('nitrotasks')

import webbrowser, os, sys, re, pickle, urllib, urllib2, threading
from gi.repository import Gtk, WebKit, Unity # pylint: disable=E0611
import logging
logger = logging.getLogger('nitrotasks')

from nitrotasks_lib import Window
from nitrotasks_lib.helpers import get_media_file

# See nitrotasks_lib.Window.py for more details about how this class works
class NitrotasksWindow(Window):
    __gtype_name__ = "NitrotasksWindow"
    
    def finish_initializing(self, builder): # pylint: disable=E1002
        """Set up the main window"""
        super(NitrotasksWindow, self).finish_initializing(builder)

        "LOCALSTORAGE POLYFILL"
        home = os.getenv('HOME')
        # Try load data
        try:
            storage_file = open(home + '/.nitrodata.pkl', 'r')
        except:
            # Create File
            tmpdata = {'tasks': '(null)', 'lists': '(null)', 'prefs': '(null)'}
            output = open(home + '/.nitrodata.pkl', 'w')
            pickle.dump(tmpdata, output)
            output.close()

            storage_file = open(home + '/.nitrodata.pkl', 'r')


        localstorage = pickle.load(storage_file)
        storage_file.close()

        self.scrolledwindow = self.builder.get_object("scrolledwindow")
        self.toolbar = self.builder.get_object("toolbar1")
        self.add_button = self.builder.get_object("add_button")
        self.delete_button = self.builder.get_object("delete_button")
        self.sort_button = self.builder.get_object("sort_button")
        self.sync_button = self.builder.get_object("sync_button")
        self.settings_button = self.builder.get_object("settings_button")

        self.webview = WebKit.WebView()
        self.scrolledwindow.add(self.webview)
        self.webview.props.settings.enable_default_context_menu = False
        self.webview.load_uri(get_media_file('app/index.html'))
        self.webview.show()

        launcher = Unity.LauncherEntry.get_for_desktop_id ("nitrotasks.desktop")

        style_context = self.get_style_context()
        jono = style_context.lookup_color('selected_bg_color')
        self.webview.execute_script('colorize("' + jono[1].to_string() + '")')

        def clicky(this, widget, data = None):
            print this
            self.webview.execute_script('$(".settingsbtn").click()')

        def _navigation_requested_cb(view, frame, networkRequest):
            uri = networkRequest.get_uri()
            if uri[:7] != 'file://':
                webbrowser.open(uri)

            return 1

        def title_changed(widget, frame, title):
            if title != 'null':

                title = title.split("|")

                #Gets Data from Disk
                if title[0] == 'get':
                    scriptbody = localstorage[title[1]]
                    script = "xcode = '" + scriptbody + "'"
                    browser.execute_script(script)

                elif title[0] == 'theme':
                    if title[1] == 'linux':
                        self.toolbar.show()
                        #Change UI Color
                        style_context = self.get_style_context()
                        jono = style_context.lookup_color('selected_bg_color')
                        self.webview.execute_script('colorize("' + jono[1].to_string() + '")')

                    else:
                        self.toolbar.hide()

                elif title[0] == 'count':
                    launcher.set_property("count", int(title[1]))
                    launcher.set_property("count_visible", True)


        self.webview.connect('title-changed', title_changed)
        self.webview.connect('navigation-requested', _navigation_requested_cb)

        # Code for other initialization actions should be added here.
        self.add_button.connect ("clicked", clicky, None)
        self.delete_button.connect ("clicked", clicky, None)
        self.sort_button.connect ("clicked", clicky, None)
        self.sync_button.connect ("clicked", clicky, None)
        self.settings_button.connect ("clicked", clicky, None)

