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

var releases = {
    debian: {
        buzz:       'Debian 1.1 (buzz)',
        rex:        'Debian 1.2 (rex)',
        bo:         'Debian 1.3 (bo)',
        hamm:       'Debian 2.0 (hamm) http://www.debian.org/releases/hamm/',
        slink:      'Debian 2.1 (slink) http://www.debian.org/releases/slink/',
        potato:     'Debian 2.2 (potato) http://www.debian.org/releases/potato/',
        woody:      'Debian 3.0 (woody) http://www.debian.org/releases/woody/',
        sarge:      'Debian 3.1 (sarge) http://www.debian.org/releases/sarge/',
        etch:       'Debian 4.0 (etch) http://www.debian.org/releases/etch/',
        lenny:      'Debian 5.0 (lenny) http://www.debian.org/releases/lenny/',
        squeeze:    'Debian 6.0 (squeeze, oldstable) http://www.debian.org/releases/squeeze/',
        wheezy:     'Debian 7.0 (wheezy, stable) http://www.debian.org/releases/wheezy/',
        jessie:     'Debian 8.0 (jessie, testing) http://www.debian.org/releases/jessie/',
        sid:        'Debian Unstable (sid, unstable) http://www.debian.org/releases/sid/',
    },
    ubuntu: {
        warty:      'Ubuntu 4.10 (Warty Warthog) http://old-releases.ubuntu.com/releases/warty/',
        hoary:      'Ubuntu 5.04 (Hoary Hedgehog) http://old-releases.ubuntu.com/releases/hoary/',
        breezy:     'Ubuntu 5.10 (Breezy Badger) http://old-releases.ubuntu.com/releases/breezy/',
        dapper:     'Ubuntu 6.06 LTS (Dapper Drake) http://old-releases.ubuntu.com/releases/dapper/',
        edgy:       'Ubuntu 6.10 (Edgy Eft) http://old-releases.ubuntu.com/releases/edgy/',
        feisty:     'Ubuntu 7.04 (Feisty Fawn) http://old-releases.ubuntu.com/releases/feisty/',
        gutsy:      'Ubuntu 7.10 (Gutsy Gibbon) http://old-releases.ubuntu.com/releases/gutsy/',
        hardy:      'Ubuntu 8.04 LTS (Hardy Heron) http://old-releases.ubuntu.com/releases/hardy/',
        intrepid:   'Ubuntu 8.10 (Intrepid Ibex) http://old-releases.ubuntu.com/releases/intrepid/',
        jaunty:     'Ubuntu 9.04 (Jaunty Jackalope) http://old-releases.ubuntu.com/releases/jaunty/',
        karmic:     'Ubuntu 9.10 (Karmic Koala) http://old-releases.ubuntu.com/releases/karmic/',
        lucid:      'Ubuntu 10.04 LTS (Lucid Lynx) http://releases.ubuntu.com/lucid/',
        maverick:   'Ubuntu 10.10 (Maverick Meerkat) http://old-releases.ubuntu.com/releases/maverick/',
        natty:      'Ubuntu 11.04 (Natty Narwhal) http://old-releases.ubuntu.com/releases/natty/',
        oneiric:    'Ubuntu 11.10 (Oneiric Ocelot) http://old-releases.ubuntu.com/releases/oneiric/',
        precise:    'Ubuntu 12.04 LTS (Precise Pangolin) http://releases.ubuntu.com/precise/',
        quantal:    'Ubuntu 12.10 (Quantal Quetzal) http://releases.ubuntu.com/quantal/',
        raring:     'Ubuntu 13.04 (Raring Ringtail) http://releases.ubuntu.com/raring/',
        saucy:      'Ubuntu 13.10 (Saucy Salamander) http://releases.ubuntu.com/saucy/',
        trusty:     'Ubuntu 14.04 LTS (Trusty Tahr)',
    }
}

// 受け取ったリプライから事前に置換する文字列 ("変換後: 変換前" の順)
var replaceMap = {
    'd': ['debian', 'debian gnu/linux'],
    'u': ['ubuntu'],
}

// リプライに対して返答するメッセージの対応付け (前方一致)
var messageMap = {
    // Debian
    'd buzz':       releases.debian['buzz'],
    'd rex':        releases.debian['rex'],
    'd bo':         releases.debian['bo'],
    'd hamm':       releases.debian['hamm'],
    'd slink':      releases.debian['slink'],
    'd potato':     releases.debian['potato'],
    'd woody':      releases.debian['woody'],
    'd sarge':      releases.debian['sarge'],
    'd etch':       releases.debian['etch'],
    'd lenny':      releases.debian['lenny'],
    'd squeeze':    releases.debian['squeeze'],
    'd wheezy':     releases.debian['wheezy'],
    'd jessie':     releases.debian['jessie'],
    'd sid':        releases.debian['sid'],

    'd 1.1':        releases.debian['buzz'],
    'd 1.2':        releases.debian['rex'],
    'd 1.3':        releases.debian['bo'],
    'd 2.0':        releases.debian['hamm'],
    'd 2.1':        releases.debian['slink'],
    'd 2.2':        releases.debian['potato'],
    'd 3.0':        releases.debian['woody'],
    'd 3.1':        releases.debian['sarge'],
    'd 4.0':        releases.debian['etch'],
    'd 5.0':        releases.debian['lenny'],
    'd 6.0':        releases.debian['squeeze'],
    'd 7':          releases.debian['wheezy'],
    'd 8':          releases.debian['jessie'],

    'd oldstable':  releases.debian['squeeze'],
    'd stable':     releases.debian['wheezy'],
    'd testing':    releases.debian['jessie'],
    'd unstable':   releases.debian['sid'],

    // Ubuntu
    'u warty':      releases.ubuntu['warty'],
    'u hoary':      releases.ubuntu['hoary'],
    'u breezy':     releases.ubuntu['breezy'],
    'u dapper':     releases.ubuntu['dapper'],
    'u edgy':       releases.ubuntu['edgy'],
    'u feisty':     releases.ubuntu['feisty'],
    'u gutsy':      releases.ubuntu['gutsy'],
    'u hardy':      releases.ubuntu['hardy'],
    'u intrepid':   releases.ubuntu['intrepid'],
    'u jaunty':     releases.ubuntu['jaunty'],
    'u karmic':     releases.ubuntu['karmic'],
    'u lucid':      releases.ubuntu['lucid'],
    'u maverick':   releases.ubuntu['maverick'],
    'u natty':      releases.ubuntu['natty'],
    'u oneiric':    releases.ubuntu['oneiric'],
    'u precise':    releases.ubuntu['precise'],
    'u quantal':    releases.ubuntu['quantal'],
    'u raring':     releases.ubuntu['raring'],
    'u saucy':      releases.ubuntu['saucy'],
    'u trusty':     releases.ubuntu['trusty'],

    'u 4.10':       releases.ubuntu['warty'],
    'u 5.04':       releases.ubuntu['hoary'],
    'u 5.10':       releases.ubuntu['breezy'],
    'u 6.06':       releases.ubuntu['dapper'],
    'u 6.10':       releases.ubuntu['edgy'],
    'u 7.04':       releases.ubuntu['feisty'],
    'u 7.10':       releases.ubuntu['gutsy'],
    'u 8.04':       releases.ubuntu['hardy'],
    'u 8.10':       releases.ubuntu['intrepid'],
    'u 9.04':       releases.ubuntu['jaunty'],
    'u 9.10':       releases.ubuntu['karmic'],
    'u 10.04':      releases.ubuntu['lucid'],
    'u 10.10':      releases.ubuntu['maverick'],
    'u 11.04':      releases.ubuntu['natty'],
    'u 11.10':      releases.ubuntu['oneiric'],
    'u 12.04':      releases.ubuntu['precise'],
    'u 12.10':      releases.ubuntu['quantal'],
    'u 13.04':      releases.ubuntu['raring'],
    'u 13.10':      releases.ubuntu['saucy'],
    'u 14.04':      releases.ubuntu['trusty'],
}

function getMessage(replyText) {
    replyText = replyText.toLowerCase()

    // debian -> d などの置換
    for (var replaceTo in replaceMap) {
        var replaceRegex = replaceMap[replaceTo]

        for (var i = 0; i < replaceRegex.length; i++) {
            var regex = replaceRegex[i]
            replyText = replyText.replace(regex, replaceTo, 'g')
        }
    }

    // messageMap の中から該当するリリースを検索
    for (var target in messageMap) {
        // 前方一致でマッチするか否か
        if (replyText.indexOf(target) === 0) {
            return messageMap[target]
        }
    }

    return null
}

// exports
exports.releases = releases
exports.getMessage = getMessage

// vim: et fenc=utf-8 sts=4 sw=4 ts=4
