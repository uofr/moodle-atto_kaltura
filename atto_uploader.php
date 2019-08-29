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
 * Simple media uploader script for resource and activity module.
 *
 * @package    atto_yukaltura
 * @copyright  (C) 2016-2019 Yamaguchi University <gh-cc@mlex.cc.yamaguchi-u.ac.jp>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))) . '/config.php');
require_once($CFG->dirroot . '/local/yukaltura/locallib.php');

defined('MOODLE_INTERNAL') || die();

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache');

global $USER, $SESSION, $COURSE;

$PAGE->set_context(context_system::instance());
$header = format_string($SITE->shortname). ": " . get_string('uploader_hdr', 'local_yumymedia');

$basedirectory = '/lib/editor/atto/plugins/yukaltura';
$baseurl = $basedirectory . '/atto_selector.php';

$PAGE->set_pagetype('atto_uploader');
$PAGE->set_url($baseurl);
$PAGE->set_course($COURSE);
$PAGE->set_pagelayout('embedded');
$PAGE->set_title($header);
$PAGE->set_heading($header);
$PAGE->add_body_class('mymedia-index');
$PAGE->requires->css($basedirectory . '/css/atto_yukaltura.css');
$PAGE->requires->js_call_amd('atto_yukaltura/attouploader', 'init', null);

require_login();

echo $OUTPUT->header();

$context = context_user::instance($USER->id);
require_capability('local/yumymedia:view', $context, $USER);
$renderer = $PAGE->get_renderer('local_yumymedia');

// Connect to Kaltura server.
$kaltura = new yukaltura_connection();
$connection = $kaltura->get_connection(true, KALTURA_SESSION_LENGTH);

if (!$connection) {  // When connection failed.
    $url = new moodle_url('/admin/settings.php', array('section' => 'local_yukaltura'));
    print_error('conn_failed', 'local_yukaltura', $baseurl);
} else {  // When connection succeed.
    // Get publisher name and secret.
    $publishername = local_yukaltura_get_publisher_name();
    $secret = local_yukaltura_get_admin_secret();
    $kalturahost = local_yukaltura_get_host();
    $partnerid = local_yukaltura_get_partner_id();
    $control = local_yukaltura_get_default_access_control($connection);
    $expiry = 21600;
    $uploadurl = local_yukaltura_get_host() . '/api_v3/service/uploadToken/action/upload';

    // Start kaltura session.
    $ks = $connection->session->start($secret, $publishername, KalturaSessionType::ADMIN, $partnerid, $expiry);
    // Get the root category path.
    $result = local_yukaltura_get_root_category();
    $rootid = $result['id'];
    $rootpath = $result['name'];

    $output = '';

    if ($ks == null) { // Session failed.
        $output .= $renderer->create_session_failed_markup($ks);
    } else if (get_config(KALTURA_PLUGIN_NAME, 'rootcategory') == null ||
             get_config(KALTURA_PLUGIN_NAME, 'rootcategory') == '' || empty($rootpath)) {
        $output .= $renderer->create_category_failed_markup('atto');
    } else if ($control == null) {
        $output .= $renderer->create_access_control_failed_markup('atto');
    } else { // Session started.
        $attr = array('id' => 'upload_info', 'name' => 'upload_info');
        $output .= html_writer::start_tag('div', $attr);

        $attr = array('method' => 'post', 'name' => 'entry_form', 'enctype' => 'multipart/form-data',
                      'action' => $uploadurl . '" autocomplete="off"');
        $output .= html_writer::start_tag('form', $attr);

        $output .= $renderer->create_file_selection_markup();

        $output .= $renderer->create_entry_metadata_markup($ks, $kalturahost, $rootpath, $control, false);

        $output .= html_writer::end_tag('form');

        $output .= $renderer->create_atto_hidden_markup();

        $output .= html_writer::end_tag('div');
    }

    echo $output;
}

echo $OUTPUT->footer();