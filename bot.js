/*!
 * Copyright (C) 2013 Kimura Youichi <kim.upsilon@bucyou.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license AGPL-3.0
 */

'use strict';

var common = require('./deb-upsilon')
var config = require('./config')

var util = require('util')
var twitter = require('ntwitter')

var twit = new twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token,
    access_token_secret: config.twitter.access_secret,
})

function getTimestamp() {
    var date = new Date()
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

function onData(data) {
    if (!data || !data.user || !data.text)
        return

    if ('retweeted_status' in data)
        return

    var statusId = data.id_str
    var screenName = data.user.screen_name
    var text = data.text

    var mentionRegex = new RegExp('@' + config.twitter.screen_name + '\\b')
    if (!mentionRegex.test(text))
        return

    util.log(util.format('bot: receive @%s: "%s"', screenName, text))

    text = text.replace(mentionRegex, '').trim()

    var message = common.getMessage(text)
    if (message === null)
        message = '何それ'

    message = util.format('@%s %s [%s]', screenName, message, getTimestamp())
    util.log(util.format('bot: reply "%s"', message))

    twit.updateStatus(message, { in_reply_to_status_id: statusId }, function(err, results) {
        if (!err)
            util.log('bot: reply success')
        else
            util.error('bot: reply failed: ' + err)
    })
}

function onDisconnect() {
    util.log('userstream: disconnect')
    util.log('userstream: waiting to restart')
    setTimeout(connect, 10 * 1000)
}

function connect() {
    util.log('userstream: starting')

    twit.stream('user', function(stream) {
        util.log('userstream: connected')

        stream.on('data', function(data) {
            try {
                onData(data)
            }
            catch (err) {
                util.error(err.stack)
            }
        })

        stream.on('end', onDisconnect)
        stream.on('destroy', onDisconnect)
    })
}

connect()

// vim: et fenc=utf-8 sts=4 sw=4 ts=4
