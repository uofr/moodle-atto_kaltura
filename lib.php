<?php
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

/**
 * Atto text editor integration library file.
 *
 * @package   atto_yukaltura
 * @copyright (C) 2019 Yamaguchi University <gh-cc@mlex.cc.yamaguchi-u.ac.jp>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Initialise this plugin.
 */
function atto_yukaltura_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(array(
                                          'insert',
                                          'cancel',
                                          'selector_button_title',
                                          'uploader_button_title',
                                          'recorder_button_title',
                                          'form_title'),
                                    'atto_yukaltura');
}

/**
 * Return the js params required for this module.
 * @param string $elementid
 * @param stdClass $options - the options for the editor, including the context.
 * @param stdClass $fpoptions - unused.
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_yukaltura_params_for_js($elementid, $options, $fpoptions) {
    global $USER, $COURSE, $CFG;

    require_once($CFG->dirroot . '/config.php');
    require_once($CFG->dirroot . '/local/yukaltura/locallib.php');

    require_login();

    $basedirectory = '/lib/editor/atto/plugins/yukaltura';

    // Get course context.
    $coursecontext = context_course::instance($COURSE->id);

    // Get user context id.
    $usercontextid = context_user::instance($USER->id)->id;
    $disabled = false;

    // Get configuration parameters for Kaltura.
    $enablemymedia = local_yukaltura_get_mymedia_permission();
    $enableuploading = get_config('local_yukaltura', 'atto_upload');
    $enablerecording = get_config('local_yukaltura', 'enable_webcam');

    // Config our array of data.
    $params = array();
    $params['usercontextid'] = $usercontextid;

    // If they don't have permission don't show it.
    if (!has_capability('atto/yukaltura:view', $coursecontext) ||
        !has_capability('local/yumymedia:view', $coursecontext) ||
        !has_capability('local/yumymedia:search', $coursecontext) ||
        !has_capability('local/yumymedia:editmetadata', $coursecontext) ||
        !has_capability('local/yumymedia:upload', $coursecontext) ||
        !has_capability('local/yumymedia:delete', $coursecontext)) {
        $disabled = true;
    }

    // Add our disabled param.
    $params['disabled'] = $disabled;

    // Add URL of media selector.
    $params['selectorurl'] = $CFG->wwwroot . $basedirectory . '/atto_selector.php';
    // Add URL of media uploader.
    $params['uploaderurl'] = $CFG->wwwroot . $basedirectory . '/atto_uploader.php';
    // Add URL of media recorder.
    $params['recorderurl'] = $CFG->wwwroot . $basedirectory . '/atto_recorder.php';

    // Set configuration parameters for Kaltura.
    $params['enablemymedia'] = "$enablemymedia";
    $params['enableuploading'] = "$enableuploading";
    $params['enablerecording'] = "$enablerecording";

    return $params;
}
