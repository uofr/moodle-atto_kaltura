YUI.add('moodle-atto_yukaltura-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package   atto_yukaltura
 * @copyright (C) 2019 Yamaguchi University <gh-cc@mlex.cc.yamaguchi-u.ac.jp>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_yukaltura-button
 */

/**
 * Atto text editor yukaltura plugin.
 *
 * @namespace M.atto_yukaltura
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_yukaltura';
var MEDIACONTROL = 'yukaltura_media';

var CSS = {
    INPUTSUBMIT: 'yukaltura_insert_btn',
    INPUTCANCEL: 'yukaltura_cancel_btn'
};

var TEMPLATE = '';

TEMPLATE = "<iframe src=\"" + "{{url}}" + "\" width=\"680px\" height=\"580px\" name=\"yukaltura_frame\" "
         + "id=\"yukaltura_frame_{{elementid}}\"></iframe>"
         + '<div align="right">'
         + '<input type="button" class="{{CSS.INPUTSUBMIT}}" id="{{CSS.INPUTSUBMIT}}" name="{{CSS.INPUTSUBMIT}}" '
         + 'value={{get_string "insert" component}}>'
         + '&nbsp;'
         + '<input type="button" class="{{CSS.INPUTCANCEL}}" id="{{CSS.INPUTCANCEL}}" name="{{CSS.INPUTCANCEL}}" '
         + 'value={{get_string "cancel" component}}>'
         + '</div>'
         + '<input type="hidden" id="select_id" name="select_id" value="">';

var editorid = '';

Y.namespace('M.atto_yukaltura').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * Initialize the button.
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        if (this.get('enablemymedia') == 1) {
            this.addButton({
                icon: 'ed/selector',
                iconComponent: 'atto_yukaltura',
                buttonName: 'selector',
                title: 'selector_button_title',
                callback: this._displaySelector,
                callbackArgs: 'selector'
            });

            if (this.get('enableuploading') == 1) {
                this.addButton({
                    icon: 'ed/uploader',
                    iconComponent: 'atto_yukaltura',
                    buttonName: 'uploader',
                    title: 'uploader_button_title',
                    callback: this._displayUploader,
                    callbackArgs: 'uploader'
                });

                if (this.get('enablerecording') == 1) {
                    this.addButton({
                        icon: 'ed/recorder',
                        iconComponent: 'atto_yukaltura',
                        buttonName: 'recorder',
                        title: 'recorder_button_title',
                        callback: this._displayRecorder,
                        callbackArgs: 'recorder'
                    });
                }
            }
        }

    },

    /**
     * Get the id of the media control where we store the ice cream flavor.
     *
     * @method _getMediaControlName
     * @return {string} - the name/id of the media form field
     * @private
     */
    _getMediaControlName: function(){
        return(this.get('host').get('elementid') + '_' + MEDIACONTROL);
    },

    /**
     * Display the atto selector.
     *
     * @method _displaySelector
     * @param {object} clickedicon - object of clicked button.
     * @private
     */
    _displaySelector: function(e, clickedicon) {
        e.preventDefault();
        var width = 700;
        var height = 720;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('form_title', COMPONENTNAME),
            width: width + 'px',
            height: height + 'px',
            focusAfterHide: clickedicon
        });

        // Dialog doesn't detect changes in width without this if you reuse the dialog, this seems necessary.
        if (dialogue.width !== width + 'px'){
            dialogue.set('width', width + 'px');
        }

        // Dialog doesn't detect changes in height without this if you reuse the dialog, this seems necessary.
        if (dialogue.height !== height + 'px'){
            dialogue.set('height', height + 'px');
        }

        // Append buttons to iframe.
        var buttonform = this._getFormContent('selectorurl');
        var bodycontent = Y.Node.create('<div id="selector_' + editorid + '" name="selector_' + editorid + '"></div>');
        bodycontent.append(buttonform);

        // Set to bodycontent.
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },

    /**
     * Display the atto uploader.
     * @param {object} e - event object.
     * @param {object} clickedicon - object of clicked button.
     * @method _displayUploader
     * @private
     */
    _displayUploader: function(e, clickedicon) {
        e.preventDefault();
        var width = 700;
        var height = 720;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('form_title', COMPONENTNAME),
            width: width + 'px',
            height: height + 'px',
            focusAfterHide: clickedicon
        });

        // Dialog doesn't detect changes in width without this if you reuse the dialog, this seems necessary.
        if (dialogue.width !== width + 'px'){
            dialogue.set('width', width + 'px');
        }

        // Dialog doesn't detect changes in height without this if you reuse the dialog, this seems necessary.
        if (dialogue.height !== height + 'px'){
            dialogue.set('height', height + 'px');
        }

        // Append buttons to iframe.
        var buttonform = this._getFormContent('uploaderurl');
        var bodycontent = Y.Node.create('<div id="uploader_' + editorid + '" name="uploader_' + editorid + '"></div>');
        bodycontent.append(buttonform);

        // Set to bodycontent.
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },

    /**
     * Display the atto recorder.
     * @param {object} e - event object.
     * @param {object} clickedicon - object of clicked button.
     * @method _displayRecorder
     * @private
     */
    _displayRecorder: function(e, clickedicon) {
        e.preventDefault();
        var width = 700;
        var height = 720;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('form_title', COMPONENTNAME),
            width: width + 'px',
            height: height + 'px',
            focusAfterHide: clickedicon
        });

        // Dialog doesn't detect changes in width without this if you reuse the dialog, this seems necessary.
        if (dialogue.width !== width + 'px'){
            dialogue.set('width', width + 'px');
        }

        // Dialog doesn't detect changes in height without this if you reuse the dialog, this seems necessary.
        if (dialogue.height !== height + 'px'){
            dialogue.set('height', height + 'px');
        }

        // Append buttons to iframe.
        var buttonform = this._getFormContent('recorderurl');
        var bodycontent = Y.Node.create('<div id="recorder_' + editorid + '" name="recorder_' + editorid + '"></div>');
        bodycontent.append(buttonform);

        // Set to bodycontent.
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },

    /**
     * Return the media uploader content for the tool, attaching any required events.
     *
     * @method _getFormContent
     * @param {string} formurl - URL of uploader, recorder, or selector form.
     * @return {Node} - The content to place in the dialogue.
     * @private
     */
    _getFormContent: function(formurl) {
        var template = Y.Handlebars.compile(TEMPLATE),
        content = Y.Node.create(template({
            elementid: this.get('host').get('elementid'),
            CSS: CSS,
            component: COMPONENTNAME,
            url: this.get(formurl)
        }));

        editorid = this.get('host').get('elementid');

        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        this._form.one('.' + CSS.INPUTCANCEL).on('click', this._doCancel, this);
        return content;
    },

    /**
     * Inserts the users input onto the page.
     * @param {object} e - event object.
     * @method _doInsert
     * @private
     */
    _doInsert : function(e) {
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        this.editor.focus();

        if (Y.one('#yukaltura_select_id') !== null) {
            var entryid = Y.one('#yukaltura_select_id').get('value');
            var kalturahost = Y.one('#yukaltura_host').get('value');
            var partnerid = Y.one('#yukaltura_partnerid').get('value');
            var uiconfid = Y.one('#yukaltura_uiconfid').get('value');
            var width = Y.one('#yukaltura_width').get('value');
            var height = Y.one('#yukaltura_height').get('value');

            var day = new Date();
            var timestamp = day.getTime();

            if (entryid !== null && entryid !== '' && kalturahost !== null && kalturahost !== '' &&
                partnerid !== null && partnerid !== '' && uiconfid !== null && uiconfid !== '' &&
                width !== null && width !== '' && height !== null && height !== '') {
                var code = '<iframe src="' + kalturahost + '/p/' + partnerid + '/sp/' + partnerid + '00/';
                code = code + 'embedIframeJs/uiconf_id/' + uiconfid + '/partner_id/' + partnerid + '?';
                code = code + 'iframeembed=true&playerId=kaltura_player_' + timestamp + '&entry_id=' + entryid;
                code = code + '" width="' + width + '" height="' + height + '" allowfullscreen webkitallowfullscreen ';
                code = code + 'mozAllowFullScreen frameborder="0" allow="encrypted-media"></iframe>';

                this.get('host').insertContentAtFocusPoint(code);
                this.markUpdated();
            }
        }

        this._removeParameters();
    },

    /**
     * Close modal dialogue.
     * @param {object} e - event object.
     * @method _doCancel
     * @private
     */
    _doCancel : function(e) {
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        this.editor.focus();

        this._removeParameters();
    },

    /**
     * Remove hidden parameters.
     * @method _removeParameters
     * @private
     */
    _removeParameters : function() {
        Y.all('#yukaltura_select_id').remove();
        Y.all('#yukaltura_host').remove();
        Y.all('#yukaltura_partnerid').remove();
        Y.all('#yukaltura_uiconfid').remove();
        Y.all('#yukaltura_width').remove();
        Y.all('#yukaltura_height').remove();
    }
},
{
    ATTRS: {
        disabled: {
            value: false
        },
        usercontextid: {
            value: null
        },
        selectorurl: {
            value: ''
        },
        uploaderurl: {
            value: ''
        },
        recorderurl: {
            value: ''
        },
        enablemymedia: {
            value: 0
        },
        enableuploading: {
            value: 0
        },
        enablerecording: {
            value: 0
        }
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
