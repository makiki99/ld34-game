var	gameState = 0, // 0 - menu, 1 - ingame, 2, - win 3 - lose
	enemy = {
		hp : 900,
		posX : 240,
		posY : -120,
		hitbox : [-180,-15,360,25], // x1, y1, width, height
		direction : "left",
		invulnerabilityFrames: 240,
		//data for ai
		tactic: 0,
		tacticFrame: 0,
		directionX: 0,
	},
	player = {
		hp : 5,
		posX : 240,
		posY : 590,
		grazeHitbox : [-11,-9,22,24],
		hitbox : [-3,-3,6,5],
		bulletDelay : 4,
		currentDelay : 0
	},
	projectiles = [],
	flashFrames = 0,
	grade = 0,
	score = 0,
	toNextGrade = 0,
	frame = 0,
	gradeTable = [
		["1", 0],
		["2", 4000],
		["3", 6000],
		["4", 10000],
		["5", 13000],
		["6", 16000],
		["7", 19000],
		["8", 21000],
		["9", 23000],
		["10", 25000],
		["11", 27000],
		["12", 29000],
		["EX1", 32000],
		["EX2", 34000],
		["EX3", 36000],
		["EX4", 38000],
		["EX5", 39500],
		["EX6", 41000],
		["EX7", 42500],
		["EX8", 44000],
		["EX9", 45500],
		["EX10", 47000],
		["EX11", 48500],
		["EX12", 50000],
	]

function draw() {

	draw_sprite(canvas, bg, 240, 320);
	rectfill(canvas,0,0,480,640,makecol(255,255,255,flashFrames*2))
	if (flashFrames > 0) {flashFrames--}

	if (gameState == 0) {

		textout(canvas,font,"Micro Danmaku",80,100,24,makecol(255,255,255));
		textout(canvas,font,"Press left and right arrow to start",80,300,16,makecol(255,255,255));

	} else if (gameState == 1) {

		draw_sprite(canvas, enemyImage, enemy.posX, enemy.posY);
		draw_sprite(canvas, playerImage, player.posX, player.posY);

		for (var i=0 ; i < projectiles.length ; i++){
			draw_sprite(canvas, projectiles[i].image, projectiles[i].posX, projectiles[i].posY);
		}

		rectfill(canvas,15,10,450,10,"0xff000000");
		rectfill(canvas,15,10,enemy.hp/2,10,"0xffff0000");
		rect(canvas,15,10,150,10,"0xff000000",2);
		rect(canvas,165,10,150,10,"0xff000000",2);
		rect(canvas,315,10,150,10,"0xff000000",2);

		for (var i = 0 ; i < player.hp ; i++) {
			draw_sprite(canvas, heart, 13+(i*26), 627);
		}

		textout(canvas,font,"SCORE "+score,300,630,20,makecol(255,255,255,40));

	} else if (gameState == 2) {
		textout(canvas,font,"Congratulations!",100,80,30,makecol(255,255,255));
		textout(canvas,font,"You have won the battle!",80,150,24,makecol(255,255,255));
		textout(canvas,font,"You have achieved score:",80,200,24,makecol(255,255,255));
		textout(canvas,font,score,280,240,24,makecol(255,255,255));
		textout(canvas,font,"This means you have reached:",80,300,24,makecol(255,255,255));
		textout(canvas,font,"GRADE "+gradeTable[grade][0],250,340,24,makecol(255,255,255));
	} else if (gameState == 3) {
		textout(canvas,font,"You died trying",120,80,24,makecol(255,255,255));
		textout(canvas,font,"to defeat the enemy...",100,115,24,makecol(255,255,255));
		textout(canvas,font,"You have achieved score:",80,200,24,makecol(255,255,255));
		textout(canvas,font,score,280,240,24,makecol(255,255,255));
		textout(canvas,font,"This means you have reached:",80,300,24,makecol(255,255,255));
		textout(canvas,font,"GRADE "+gradeTable[grade][0],250,340,24,makecol(255,255,255));
	}

}

function update() {

	//enter to start
	if (key[KEY_LEFT] && key[KEY_RIGHT] && gameState == 0) {
		gameState = 1;
		return;
	}

	if (gameState == 1) {
		//enemy behavoiur
		if (enemy.tactic == 0) {
			enemy.posY += 1
			enemy.invulnerabilityFrames -= 1
			if (enemy.invulnerabilityFrames < 0) {
				enemy.tactic = 1
			}
		} else if (enemy.tactic == 1) {
			if (enemy.tacticFrame % 50 == 0) {
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX + 90,
				 posY: enemy.posY + 35,
				 velX: -1.25 + frand()/2,
				 velY: 1.8,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX + 90,
				 posY: enemy.posY + 35,
				 velX: -0.75 + frand()/2,
				 velY: 1.9,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX + 90,
				 posY: enemy.posY + 35,
				 velX: -0.25 + frand()/2,
				 velY: 2,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX + 90,
				 posY: enemy.posY + 35,
				 velX: 0.25 + frand()/2,
				 velY: 1.9,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX + 90,
				 posY: enemy.posY + 35,
				 velX: 0.75 + frand()/2,
				 velY: 1.8,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
		 	} else if (enemy.tacticFrame % 25 == 0) {
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX - 90,
				 posY: enemy.posY + 35,
				 velX: -1.25 + frand()/2,
				 velY: 1.8,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX - 90,
				 posY: enemy.posY + 35,
				 velX: -0.75 + frand()/2,
				 velY: 1.9,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX - 90,
				 posY: enemy.posY + 35,
				 velX: -0.25 + frand()/2,
				 velY: 2,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX - 90,
				 posY: enemy.posY + 35,
				 velX: 0.25 + frand()/2,
				 velY: 1.9,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: enemy.posX - 90,
				 posY: enemy.posY + 35,
				 velX: 0.75 + frand()/2,
				 velY: 1.8,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 75 == 0) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: enemy.posX - 30,
				 posY: enemy.posY + 30,
				 velX: -1.125 + frand()/4,
				 velY: 2.4,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: enemy.posX,
				 posY: enemy.posY + 30,
				 velX: -0.125 + frand()/4,
				 velY: 2.4,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: enemy.posX + 30,
				 posY: enemy.posY + 30,
				 velX: 0.875 + frand()/4,
				 velY: 2.4,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			enemy.tacticFrame++
			if (enemy.tacticFrame > 450) {
				enemy.tactic = 2;
				enemy.tacticFrame = 0;
			}
			if (enemy.hp < 600) {
				enemy.tactic = 3;
				enemy.tacticFrame = 0;
				score += 1000 + 400 * player.hp
			}
		} else if (enemy.tactic == 2) {
			if (enemy.tacticFrame % 5 == 0) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: enemy.posX + enemy.tacticFrame % 150,
				 posY: enemy.posY + 40,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: enemy.posX - enemy.tacticFrame % 150,
				 posY: enemy.posY + 40,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			enemy.tacticFrame++
			if (enemy.tacticFrame > 160) {
				enemy.tactic = 1
				enemy.tacticFrame = 0
			}
			if (enemy.hp < 600) {
				enemy.tactic = 3
				enemy.tacticFrame = 0
				score += 1000 + 400 * player.hp
			}
		} else if (enemy.tactic == 3) {
			if (enemy.tacticFrame % 60 == 0) {
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: -30,
				 posY: 95,
				 velX: 1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: -30,
				 posY: 185,
				 velX: 1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: -30,
				 posY: 275,
				 velX: 1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: -30,
				 posY: 365,
				 velX: 1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: -30,
				 posY: 455,
				 velX: 1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: -30,
				 posY: 545,
				 velX: 1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
			 });
		 } else if (enemy.tacticFrame % 30 == 0) {
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: 510,
				 posY: 95,
				 velX: -1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: 510,
				 posY: 185,
				 velX: -1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: 510,
				 posY: 275,
				 velX: -1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: 510,
				 posY: 365,
				 velX: -1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: 510,
				 posY: 455,
				 velX: -1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: 510,
				 posY: 545,
				 velX: -1.5,
				 velY: 1.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 40 == 0) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: player.posX,
				 posY: enemy.posY + 40,
				 velX: 0,
				 velY: 3.5,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			enemy.tacticFrame++
			if (enemy.hp < 300) {
				enemy.tactic = 4
				enemy.tacticFrame = 0
				score += 2000 + 600 * player.hp
			}
		} else if (enemy.tactic == 4) {
			if (enemy.tacticFrame % 20 == 0) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 15,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 2) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 65,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 4) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 115,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 6) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 165,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 8) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 215,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 10) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 265,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 12) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 315,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 14) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 365,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 16) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 415,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 20 == 18) {
				projectiles.push({
				 image: enemyBulletImage2,
				 source: "enemy",
				 posX: 465,
				 posY: -10,
				 velX: 0,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			if (enemy.tacticFrame % 3 == 0) {
				projectiles.push({
				 image: enemyBulletImage,
				 source: "enemy",
				 posX: rand() % 450 - 15,
				 posY: enemy.posY + 40,
				 velX: frand()/2 - 0.25,
				 velY: 3,
				 hitbox: [-6,-6,12,12],
				 grazed: false
				});
			}
			enemy.tacticFrame++
		}

		//player movement
		if (key[KEY_LEFT]) {
			player.posX -= 4;
			if (player.posX < 30) {
				player.posX = 30
			}
		}
		if (key[KEY_RIGHT]) {
			player.posX += 4;
			if (player.posX > 450) {
				player.posX = 450;
			}
		}

		//autofire
		if (player.currentDelay >= player.bulletDelay) {
			projectiles.push({
				image: playerBulletImage,
				source: "player",
				posX: player.posX,
				posY: player.posY - 20,
				velX: 0,
				velY: -10,
				hitbox: [-6,-12,12,16]
			});
			player.currentDelay = 0;
		} else {
			player.currentDelay++;
		}

		for (var i=0 ; i < projectiles.length ; i++){
			projectiles[i].posX += projectiles[i].velX;
			projectiles[i].posY += projectiles[i].velY;
			//out of bounds check to prevent memory leak
			if (projectiles[i].posX > 600 || projectiles[i].posX < -160 ||
				projectiles[i].posY > 800 || projectiles[i].posY < -160
			) {
				projectiles.splice(i,1);
			}
			//collision check
			if (projectiles[i].source == "player") {

				var bulletShape = {
					x : projectiles[i].posX + projectiles[i].hitbox[0],
					y : projectiles[i].posY + projectiles[i].hitbox[1],
					w : projectiles[i].hitbox[2],
					h : projectiles[i].hitbox[3],
				}
				var targetShape = {
					x : enemy.posX + enemy.hitbox[0],
					y : enemy.posY + enemy.hitbox[1],
					w : enemy.hitbox[2],
					h : enemy.hitbox[3],
				}

				if (bulletShape.x < targetShape.x + targetShape.w &&
   				bulletShape.x + bulletShape.w > targetShape.x &&
   				bulletShape.y < targetShape.y + targetShape.h &&
   				bulletShape.h + bulletShape.y > targetShape.y) {

						projectiles.splice(i,1);
						if (enemy.invulnerabilityFrames <= 0) {
							enemy.hp--;
							score += 10
						};
						if (enemy.hp <= 0) {
							gameState = 2;
							flashFrames = 120;
							score += 10000 + 1000 * player.hp
							return;
						}

				}

			} else if (
				projectiles[i].source == "enemy" &&
				projectiles[i].grazed == false
			) {

				var bulletShape = {
					x : projectiles[i].posX + projectiles[i].hitbox[0],
					y : projectiles[i].posY + projectiles[i].hitbox[1],
					w : projectiles[i].hitbox[2],
					h : projectiles[i].hitbox[3],
				}

				var targetShape = {
					x : player.posX + player.grazeHitbox[0],
					y : player.posY + player.grazeHitbox[1],
					w : player.grazeHitbox[2],
					h : player.grazeHitbox[3],
				}

				if (bulletShape.x < targetShape.x + targetShape.w &&
   				bulletShape.x + bulletShape.w > targetShape.x &&
   				bulletShape.y < targetShape.y + targetShape.h &&
   				bulletShape.h + bulletShape.y > targetShape.y) {

						projectiles[i].grazed = true;
						score += 25;

				}

			} else if (projectiles[i].source == "enemy") {

				var bulletShape = {
					x : projectiles[i].posX + projectiles[i].hitbox[0],
					y : projectiles[i].posY + projectiles[i].hitbox[1],
					w : projectiles[i].hitbox[2],
					h : projectiles[i].hitbox[3],
				}

				var targetShape = {
					x : player.posX + player.hitbox[0],
					y : player.posY + player.hitbox[1],
					w : player.hitbox[2],
					h : player.hitbox[3],
				}

				if (bulletShape.x < targetShape.x + targetShape.w &&
   				bulletShape.x + bulletShape.w > targetShape.x &&
   				bulletShape.y < targetShape.y + targetShape.h &&
   				bulletShape.h + bulletShape.y > targetShape.y) {

						projectiles = [];
						player.hp--;
						flashFrames = 30;

						if (player.hp <= 0) {
							gameState = 3;
							flashFrames = 120;
							return;
						}

				}

			}

		}

	}

	//grade update
	while (grade+1 < gradeTable.length && score >= gradeTable[grade+1][1]) {
		grade++
	}


}

function main() {

	allegro_init_all("game_canvas", 480, 640);

	enemyImage = load_bmp("enemy.png");
	playerImage = load_bmp("player.png");
	enemyBulletImage = load_bmp("bullet1.png");
	enemyBulletImage2 = load_bmp("bullet3.png");
	playerBulletImage = load_bmp("bullet2.png");
	heart = load_bmp("heart.png");
	bg = load_bmp("bg.png");

	ready(function(){
		loop(function(){
			update();
			draw();
		},BPS_TO_TIMER(60));
	});

}
END_OF_MAIN();
