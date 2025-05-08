controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() > 3) {
        controller.moveSprite(Me, 150, 150)
        Me.startEffect(effects.bubbles, 5000)
        info.changeScoreBy(-3)
        pause(5000)
        controller.moveSprite(Me, 100, 100)
        CD = 5
        for (let index = 0; index < 6; index++) {
            Me.sayText(CD, 1000, false)
            CD += -1
            pause(1000)
        }
    }
})
info.onCountdownEnd(function () {
    if (info.score() >= 5) {
        music.stopAllSounds()
        game.gameOver(true)
    } else {
        music.stopAllSounds()
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (Me.overlapsWith(Pizza)) {
        info.changeScoreBy(1)
        Pizza.setPosition(randint(1, 159), randint(1, 119))
        music.setVolume(70)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Me.overlapsWith(otherSprite)) {
        info.changeScoreBy(-1)
        otherSprite.setPosition(randint(1, 159), randint(1, 119))
        Bomb.setVelocity(randint(-50, 50), randint(-50, 50))
        Me.startEffect(effects.fire, 200)
        music.setVolume(70)
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    }
})
let Bomb: Sprite = null
let CD = 0
let Pizza: Sprite = null
let Me: Sprite = null
music.setVolume(50)
music.play(music.createSong(hex`0078000408020105001c000f0a006400f4010a00000400000000000000000000000000000000023c0000000800012008001000012410001800012718001c0001201c002000012420002800012728002c0001252c0030000127300038000129380040000127`), music.PlaybackMode.LoopingInBackground)
let bombgen = 1
Me = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
Pizza = sprites.create(img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `, SpriteKind.Food)
controller.moveSprite(Me, 100, 100)
Me.setStayInScreen(true)
info.setScore(0)
info.startCountdown(30)
game.onUpdateInterval(5000, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    Pizza.setPosition(randint(1, 159), randint(1, 119))
    for (let index = 0; index < bombgen; index++) {
        Bomb = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        Bomb.setPosition(randint(1, 159), randint(1, 119))
        Bomb.setVelocity(randint(-50, 50), randint(-50, 50))
        Bomb.setFlag(SpriteFlag.BounceOnWall, true)
    }
    bombgen += 1
    pause(100)
})
