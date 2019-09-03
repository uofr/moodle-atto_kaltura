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
 * YU Kaltura Media for Atto, version file.
 *
 * @package   atto_yukaltura
 * @copyright (C) 2019 Yamaguchi University <gh-cc@mlex.cc.yamaguchi-u.ac.jp>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->component = 'atto_yukaltura';
$plugin->version = 2019090300;
$plugin->release = '1.0.1';
$plugin->maturity = MATURITY_STABLE;
$plugin->requires = 2015051000;
$plugin->dependencies = array(
    'local_yukaltura' => 2019083000,
    'local_yumymedia' => 2019083000
);
