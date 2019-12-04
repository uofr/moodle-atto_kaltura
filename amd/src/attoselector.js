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
 * @package   atto_kaltura
 * @copyright (C) 2019 Yamaguchi University (gh-cc@mlex.cc.yamaguchi-u.ac.jp)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module atto_kaltura/attoselector
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
                $("#kaltura_insert_btn", parent.document).prop("disabled", true);
                $("#kaltura_insert_btn", parent.document).css({opacity: "0.5"});
            }

            /**
             * This is callback function for thumbnail click.
             * @access public
             * @param {object} e - event object of target image.
             */
            function clickThumbnailImage(e) {
                var selectId = e.target.id;
                var selectName = e.target.alt;

                var fileType = $('#' + selectId + '_filetype').val();
                var naturalWidth = $('#' + selectId + '_width').val();
                var naturalHeight = $('#' + selectId + '_height').val();

                // Set name of selected media.
                $("#select_name").html(selectName);

                // Create new element if entry id element is null.
                if (parent.document.getElementById('kaltura_select_id') === null ||
                    parent.document.getElementById('kaltura_select_id')[0] === null) {
                    var element = $('body', parent.document);

                    var str = '<input type="hidden" name="kaltura_select_id" id="kaltura_select_id" value="">';
                    element.append(str);

                    str = '<input type="hidden" name="kaltura_select_name" id="kaltura_select_name" value="">';
                    element.append(str);

                    var kalturahost = $('#kalturahost').val();
                    str = '<input type="hidden" name="kaltura_host" id="kaltura_host" value="';
                    str = str + kalturahost + '">';
                    element.append(str);

                    var partnerid = $('#partnerid').val();
                    str = '<input type="hidden" name="kaltura_partnerid" id="kaltura_partnerid" value="';
                    str = str + partnerid + '">';
                    element.append(str);

                    var uiconfid = $('#uiconfid').val();
                    str = '<input type="hidden" name="kaltura_uiconfid" id="kaltura_uiconfid" value="';
                    str = str + uiconfid + '">';
                    element.append(str);

                    var width = $('#player_width').val();
                    str = '<input type="hidden" name="kaltura_width" id="kaltura_width" value="' + width + '">';
                    element.append(str);

                    var height = $('#player_height').val();
                    str = '<input type="hidden" name="kaltura_height" id="kaltura_height" value="' + height + '">';
                    element.append(str);

                    str = '<input type="hidden" name="kaltura_filetype" id="kaltura_filetype" value="">';
                    element.append(str);

                    str = '<input type="hidden" name="kaltura_naturalwidth" id="kaltura_naturalwidth" value="">';
                    element.append(str);

                    str = '<input type="hidden" name="kaltura_naturalheight" id="kaltura_naturalheight" value="">';
                    element.append(str);
                }

                // Set entry id of selected media.
                $('#kaltura_select_id', parent.document).val(selectId);
                // Set entry name of selected media.
                $('#kaltura_select_name', parent.document).val(selectName);
                // Set natural width of selected media.
                $('#kaltura_filetype', parent.document).val(fileType);
                // Set natural width of selected media.
                $('#kaltura_naturalwidth', parent.document).val(naturalWidth);
                // Set natural height of selected media.
                $('#kaltura_naturalheight', parent.document).val(naturalHeight);

                // Enable Insert button.
                $("#kaltura_insert_btn", parent.document).prop("disabled", false);
                $("#kaltura_insert_btn", parent.document).css({opacity: "1.0"});
            }

            /**
             * This function removes hidden parameters in parent document.
             * @access public
             */
            function removeParameters() {
                $('#kaltura_select_id', parent.document).remove();
                $('#kaltura_select_name', parent.document).remove();
                $('#kaltura_host', parent.document).remove();
                $('#kaltura_partnerid', parent.document).remove();
                $('#kaltura_uiconfid', parent.document).remove();
                $('#kaltura_width', parent.document).remove();
                $('#kaltura_height', parent.document).remove();
                $('#kaltura_filetype', parent.document).remove();
                $('#kaltura_naturalwidth', parent.document).remove();
                $('#kaltura_naturalheight', parent.document).remove();
            }

            $("#selectorSort").on("change", function() {
                changeSort();
            });

            $(".media_thumbnail").on("click", function(e) {
                clickThumbnailImage(e);
            });

            removeParameters();
            // Dsiable Insert button.
            $('#kaltura_insert_btn', parent.document).prop("disabled", true);
            $('#kaltura_insert_btn', parent.document).css({opacity: "0.5"});
        }
    };
});
