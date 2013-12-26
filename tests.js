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

test('getMessage(): 短縮形', function(assert) {
    var message = common.getMessage('d 5.0')
    assert.equal(message, 'Debian 5.0 (lenny) http://www.debian.org/releases/lenny/')
})

test('getMessage(): 短縮形に置換', function(assert) {
    var message = common.getMessage('debian 5.0')
    assert.equal(message, 'Debian 5.0 (lenny) http://www.debian.org/releases/lenny/')
})

test('getMessage(): 大小文字を区別しない', function(assert) {
    var message = common.getMessage('Debian 5.0')
    assert.equal(message, 'Debian 5.0 (lenny) http://www.debian.org/releases/lenny/')
})

test('getMessage(): 前方一致で検索する', function(assert) {
    var message = common.getMessage('Debian 5.0 だよー')
    assert.equal(message, 'Debian 5.0 (lenny) http://www.debian.org/releases/lenny/')
})

test('getMessage(): 不明なバージョン', function(assert) {
    var message = common.getMessage('Debian moo')
    assert.equal(message, null)
})

// vim: et fenc=utf-8 sts=4 sw=4 ts=4
