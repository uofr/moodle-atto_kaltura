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
 * Media Secctor script for kaltura media embed.
 *
 * @package    atto_tukaltura
 * @copyright  (C) 2019 Yamaguchi University (gh-cc@mlex.cc.yamaguchi-u.ac.jp)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module atto_yukaltura/attoselector
 */

define(['jquery'], function($) {

    return {
        /**
         * Initial function.
         * @access public
         */
        init: function() {

            /**
             * This function reflects change of sort option.
             * @access public
             */
            function changeSort() {
                // Get url.
                var url = $("#selectorSort").val();
                // Change url of selector window.
                location.href = url;

                removeParameters();
                // Dsiable Insert button.
                $("#yukaltura_insert_btn", parent.document).prop("disabled", true);
                $("#yukaltura_insert_btn", parent.document).css({opacity: "0.5"});
            }

            /**
             * This is callback function for thumbnail click.
             * @access public
             * @param {object} e - event object of target image.
             */
            function clickThumbnailImage(e) {
                var selectId = e.target.id;
                var selectName = e.target.alt;

                // Set name of selected media.
                $("#select_name").html(selectName);

                // Create new element if entry id element is null.
                if (parent.document.getElementById('yukaltura_select_id') === null ||
                    parent.document.getElementById('yukaltura_select_id')[0] === null) {
                    var element = $('body', parent.document);

                    var str = '<input type="hidden" name="yukaltura_select_id" id="yukaltura_select_id" value="">';
                    element.append(str);

                    var kalturahost = $('#kalturahost').val();
                    str = '<input type="hidden" name="yukaltura_host" id="yukaltura_host" value="';
                    str = str + kalturahost + '">';
                    element.append(str);

                    var partnerid = $('#partnerid').val();
                    str = '<input type="hidden" name="yukaltura_partnerid" id="yukaltura_partnerid" value="';
                    str = str + partnerid + '">';
                    element.append(str);

                    var uiconfid = $('#uiconfid').val();
                    str = '<input type="hidden" name="yukaltura_uiconfid" id="yukaltura_uiconfid" value="';
                    str = str + uiconfid + '">';
                    element.append(str);

                    var width = $('#player_width').val();
                    str = '<input type="hidden" name="yukaltura_width" id="yukaltura_width" value="' + width + '">';
                    element.append(str);

                    var height = $('#player_height').val();
                    str = '<input type="hidden" name="yukaltura_height" id="yukaltura_height" value="' + height + '">';
                    element.append(str);
                }

                // Set entry id of selectd media.
                $('#yukaltura_select_id', parent.document).val(selectId);

                // Enable Insert button.
                $("#yukaltura_insert_btn", parent.document).prop("disabled", false);
                $("#yukaltura_insert_btn", parent.document).css({opacity: "1.0"});
            }

            /**
             * This function removes hidden parameters in parent document.
             * @access public
             */
            function removeParameters() {
                $('#yukaltura_select_id', parent.document).remove();
                $('#yukaltura_host', parent.document).remove();
                $('#yukaltura_partnerid', parent.document).remove();
                $('#yukaltura_uiconfid', parent.document).remove();
                $('#yukaltura_width', parent.document).remove();
                $('#yukaltura_height', parent.document).remove();
            }

            $("#selectorSort").on("change", function() {
                changeSort();
            });

            $(".media_thumbnail").on("click", function(e) {
                clickThumbnailImage(e);
            });

            removeParameters();
            // Dsiable Insert button.
            $('#yukaltura_insert_btn', parent.document).prop("disabled", true);
            $('#yukaltura_insert_btn', parent.document).css({opacity: "0.5"});
        }
    };
});
