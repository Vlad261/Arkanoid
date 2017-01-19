
function Rect(color, x, y, width, height) {
    this.color = color; 
    this.x = x; 
    this.y = y; 
    this.width = width; 
    this.height = height; 
    this.draw = function()
    {
        context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width+100, this.height);
    };
}

function Platform(x, y, width, height) {	
    this.color = "#fff"; 
    this.x = x; 
    this.y = y; 	
    this.width = width; 
    this.height = height;
	this.longPlatform=1;
    this.draw = function() 
    {
        context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width*this.longPlatform, this.height);
    };	
}

function playerMove(e) {
	player.x2=e.pageX-7;
	bonus.y=e.pageY-7;
	if(player.x2>640)
		player.x2=640;
}

function position(){
	if(bonus.widthCell*40-game.width>0){		
		if(player.x2<120){
			if(bonus.visible<-(game.width-bonus.widthCell*40)/2){				
				f=(120-player.x2)/200;
				bonus.visible=(Math.floor((bonus.visible+f)*1000))/1000;
			}
			if(bonus.visible>-(game.width-bonus.widthCell*40)/2){
				bonus.visible=-(game.width-bonus.widthCell*40)/2;				
			}
		}
		if(player.x2>game.width-120){
			if(bonus.visible>(game.width-bonus.widthCell*40)/2){
				f=(game.width-120-player.x2)/200;
				if(f<-0.6)
					f=-0.6;
				bonus.visible=(Math.floor((bonus.visible+f)*1000))/1000;
			}		
			if(bonus.visible<(game.width-bonus.widthCell*40)/2){
				bonus.visible=(game.width-bonus.widthCell*40)/2;
			}
		}
	}
	if(player.x2<10){
		player.x2=10;		
	}
	if(player.x2>game.width-10){
		player.x2=game.width-10;
	}
	if(player.x>10){
		if(player.x+player.width*player.longPlatform/2>player.x2){
			f=(player.x2-(player.x+player.width*player.longPlatform/2))/20;
			if(f>-0.5){
				f=-0.5;
			}
			if(player.x2-(player.x+player.width*player.longPlatform/2)<-0.5){
				player.x=(Math.floor((player.x+f)*1000))/1000;
			}else{
				player.x=player.x2-player.width*player.longPlatform/2;
			}
		}
	}
	if(player.x+player.width*player.longPlatform<game.width-10){
		if(player.x+player.width*player.longPlatform/2<player.x2){
			f=(player.x2-(player.x+player.width*player.longPlatform/2))/20;
			if(f<0.5){
				f=0.5;
			}
			if(player.x2-(player.x+player.width*player.longPlatform/2)>0.5){
				player.x=(Math.floor((player.x+f)*1000))/1000;
			}else{
				player.x=player.x2-player.width*player.longPlatform/2;
			}
		}		
	}	
}

function direction(i){	
	dist=Math.round((balls[i].x-player.x+bonus.visible)*1000)/1000; 
	if(dist<=0){
		if(balls[i].y>=player.y && balls[i].y<=player.y+player.height){
			if(balls[i].vX>0){
				balls[i].vX=-balls[i].vX;
			}		
		}
		dist2 =Math.sqrt(Math.pow(player.x-balls[i].x-bonus.visible,2)+Math.pow(player.y-balls[i].y,2));		
		if(dist2-0.5<=balls[i].radius*balls[i].size){
			if(balls[i].vX<=0){
				balls[i].vX=2.79;					
				balls[i].vY=(Math.sqrt(8-Math.pow(balls[i].vX,2)));
				balls[i].vY=Math.round((-balls[i].vY)*1000)/1000;
				balls[i].vX=Math.round((-balls[i].vX)*1000)/1000;
				return;
			}
			if(balls[i].vY>0){
				balls[i].vX=-balls[i].vX;
				balls[i].vY=-balls[i].vY;			
			}
			return;
		}		
		return;
	}
	if(dist>=player.width*player.longPlatform){
		if(balls[i].y>=player.y && balls[i].y<=player.y+player.height){
			if(balls[i].vX<0){
			balls[i].vX=-balls[i].vX;
			}			
		}
		dist2=Math.sqrt(Math.pow(player.x+player.width*player.longPlatform-balls[i].x-bonus.visible,2)+Math.pow(player.y-balls[i].y,2));
		if(dist2-0.5<=balls[i].radius*balls[i].size){
			if(balls[i].vX>=0){
				balls[i].vX=2.79;
				balls[i].vY=(Math.sqrt(8-Math.pow(balls[i].vX,2)));
				balls[i].vY=Math.round((-balls[i].vY)*1000)/1000;
				balls[i].vX=Math.round((balls[i].vX)*1000)/1000;
				return;
			}
			if(balls[i].vY>0){
				balls[i].vX=-balls[i].vX;
				balls[i].vY=-balls[i].vY;
			}
			return;
		}
		return;
	}
	if(balls[i].vY>=0){
		if(dist>=player.width*player.longPlatform/2-1 && dist<=player.width*player.longPlatform/2+1){
			balls[i].vX=0;
			balls[i].vY=Math.round((-Math.sqrt(8))*1000)/1000;
			if(balls[0].vY!=0)
				balls[0].vY=balls[0].vY;
			return;
		}
		if(dist<player.width*player.longPlatform/2 && dist>0){			
			dist2=Math.floor((player.width*player.longPlatform/2)-dist);			
			balls[i].vX=-dist2/(player.width*player.longPlatform/2)*2830;
			balls[i].vY=-Math.sin(Math.acos(dist2/(player.width*player.longPlatform/2)))*2830;
			balls[i].vX=Math.floor(balls[i].vX)/1000;
			balls[i].vY=Math.floor(balls[i].vY)/1000;
			return;
		}
		if(dist>player.width*player.longPlatform/2){			
			dist2=Math.floor(dist-player.width*player.longPlatform/2);
			balls[i].vX=dist2/(player.width*player.longPlatform/2)*2830;
			balls[i].vY=-Math.sin(Math.acos(dist2/(player.width*player.longPlatform/2)))*2830;
			balls[i].vX=Math.floor(balls[i].vX)/1000;
			balls[i].vY=Math.floor(balls[i].vY)/1000;
			return;
		}
	}
}

function Ball(x, y, vX, vY, radius, speed, size) {
    this.color = "#fff"; 
    this.x = x; 
    this.y = y; 
	this.vX = vX; 
    this.vY = vY; 
	this.radius = radius;
	this.speed = speed;  
	this.size=size;
	this.kasaniy =0;	
	this.activ=false;
	this.through=false;   
    this.draw = function() 
    {
		if(this.speed>2.9){			
			if(this.size>0.8){
				this.size-=0.001;
			}
			context.fillStyle = "#f80000";
		}else{
			context.fillStyle = this.color;
		}
		context.beginPath();
		context.arc(this.x+bonus.visible, this.y, this.radius*this.size, 0 * Math.PI, 360 * Math.PI, true);
		context.fill();        
	};
}

function directionBall(){
	
}

//function explosion();

function Cell(x, y, width, height, value, displacement){	
	this.x = x; 
    this.y = y; 
    this.width = width; 
    this.height = height; 
	this.value = value;
	this.score=value==10 ? 30 : value*5;
	this.displacement = displacement;
	this.draw = function()
	{
		switch (this.value){
			case 1:
				context.fillStyle = '#ccc';
				break
			case 2:
				context.fillStyle = '#aaa';	
				break
			case 3:
				context.fillStyle = '#888';
				break
			case 10:
				context.fillStyle = '#f00';
				break
		}	
		context.fillRect(this.x+bonus.visible, this.y, this.width-1, this.height-1);		
	};	
}

function obstacle(i,j){ 

	if(bonus.y>cells[j].y && bonus.y<cells[j].y+cells[j].height && player.x2-bonus.visible>cells[j].x && player.x2-bonus.visible<cells[j].x+cells[j].width){
		bonus.x3=+j+1;				
	}	
	if(balls[i].x+balls[i].radius*balls[i].size>=cells[j].x && balls[i].x-balls[i].radius<=cells[j].x+cells[j].width && balls[i].y+balls[i].radius*balls[i].size>=cells[j].y && balls[i].y-balls[i].radius*balls[i].size<=cells[j].y+cells[j].height){
		if(balls[i].speed>2.9){
			cells[j].value=0;
			score(i,j);
			return false;
		}
		dist= balls[i].x-cells[j].x;
		if(dist>=0 && dist<=cells[j].width){				
			balls[i].vY=-balls[i].vY;				
			return true;
		}
		upLeft=true;
		upRight=true;
		downLeft=true;
		downRight=true;
		if(cells[j].displacement==0){
			if(+j>bonus.widthCell){
				if(cells[+j-bonus.widthCell].displacement==0){
					if(cells[+j-bonus.widthCell].value!=0){
						upLeft=false;
						upRight=false;						
					}
				}else{
					if(cells[+j-bonus.widthCell].value!=0){
						upLeft=false;						
					}
					if(cells[+j-bonus.widthCell+1].value!=0){
						upRight=false;						
					}
				}
			}
			if(+j+bonus.widthCell<bonus.widthCell*bonus.heightCell){
				if(cells[+j+bonus.widthCell].displacement==0){
					if(cells[+j+bonus.widthCell].value!=0){
						downLeft=false;
						downnRight=false;
					}
				}else{
					if(cells[+j+bonus.widthCell].value!=0){
						downLeft=false;						
					}
					if(cells[+j+bonus.widthCell+1].value!=0){
						downRight=false;						
					}
				}
			}
		}else{
			if(j>bonus.widthCell){
				if(cells[+j-bonus.widthCell].displacement==1){
					if(cells[+j-bonus.widthCell].value!=0){
						upLeft=false;
						upRight=false;						
					}
				}else{
					if(cells[+j-bonus.widthCell-1].value!=0){
						upLeft=false;						
					}
					if(cells[+j-bonus.widthCell].value!=0){
						upRight=false;
					}
				}
			}
			if(+j+bonus.widthCell<bonus.widthCell*bonus.heightCell){
				if(cells[+j+bonus.widthCell].displacement==1){
					if(cells[+j+bonus.widthCell].value!=0){
						downLeft=false;
						downnRight=false;						
					}
				}else{
					if(cells[+j+bonus.widthCell-1].value!=0){
						downLeft=false;						
					}
					if(cells[+j+bonus.widthCell].value!=0){
						downRight=false;
					}
				}
			}
		}
		flag=true;
		if(window.cells[+j-1]){
			if(cells[+j-1].y==cells[j].y && cells[+j-1].value!=0){
				flag=false;
			}
		}
		if(dist<0 && flag){
			if(balls[i].y>=cells[j].y && balls[i].y<=cells[j].y+cells[j].height){					
				if(balls[i].vX>0){
					balls[i].vX=-balls[i].vX;
					return true;
				}		
				if(balls[i].vX==0){
					balls[i].vX=-2;
					balls[i].vY=2;
					return true;
				}
				return true;
			}			
			if(upLeft){
				dist2=Math.sqrt(Math.pow(cells[j].x-balls[i].x,2)+Math.pow(cells[j].y-balls[i].y,2));
				if(dist2<=balls[i].radius*balls[i].size){
					if(balls[i].vX<0){
						balls[i].vY=-balls[i].vY;
						return true;
					}
					if(balls[i].vX>=0){
						balls[i].vX=-2;
						balls[i].vY=-2;						
						return true;
					}
					balls[i].vX=-balls[i].vX;
					balls[i].vY=-balls[i].vY;
					return true;
				}
			}
			if(downLeft){
				dist2=Math.sqrt(Math.pow(cells[j].x-balls[i].x,2)+Math.pow(cells[j].y+cells[j].height-balls[i].y,2));			
				if(dist2<=balls[i].radius*balls[i].size){
					if((+j+player.widthMas)<player.widthMas*player.heightMas){
						if(cells[+j+player.widthMas].value!=0){
							return false;
						}
					}		
					if(balls[i].vX<0){
						balls[i].vY=-balls[i].vY;
						return true;
					}				
					if(balls[i].vX>=0){
						balls[i].vX=-2;
						balls[i].vY=2;
						return true;
					}
					balls[i].vX=-balls[i].vX;
					balls[i].vY=-balls[i].vY;
					return true;
				}
			}			
			return false;
		}			
		if(dist>cells[j].width){
			if(balls[i].y>=cells[j].y && balls[i].y<=cells[j].y+cells[j].height){
				if(window.cells[+j+1]){
					if(cells[+j+1].value!=0){
						balls[i].vX=-balls[i].vX;
						return false;
					}
				}
				if(balls[i].vX<0){
					balls[i].vX=-balls[i].vX;
				}	
				if(balls[i].vX==0){
					balls[i].vX=2;
					balls[i].vY=2;						
					return true;
				}				
				return true;
			}
			if(upRight){
				dist2=Math.sqrt(Math.pow(cells[j].x+cells[j].width-balls[i].x,2)+Math.pow(cells[j].y-balls[i].y,2));
				if(dist2<=balls[i].radius*balls[i].size){	
					if((j%player.widthMas)+1!=player.heightMas){
						if(window.cells[+j+1]){
							if(cells[+j+1].value!=0){
								return false;
							}
						}
					}
					if(balls[i].vX>0){
						balls[i].vY=-balls[i].vY;
						return true;
					}
					if(balls[i].vX<=0){
						balls[i].vX=2;
						balls[i].vY=-2;						
						return true;
					}
					balls[i].vX=-balls[i].vX;
					balls[i].vY=-balls[i].vY;
					return true;
				}
			}
			if(downRight){
				dist2=Math.sqrt(Math.pow(cells[j].x+cells[j].width-balls[i].x,2)+Math.pow(cells[j].y+cells[j].height-balls[i].y,2));
				if(dist2<=balls[i].radius*balls[i].size){				
					if((j%player.widthMas)+1!=player.heightMas){
						if(window.cells[+j+1]){
							if(cells[+j+1].value!=0){
								return false;
							}
						}
					}
					if((+j+player.widthMas)<player.widthMas*player.heightMas){
						if(cells[+j+player.widthMas].value!=0){
							return false;
						}
					}	
					if(balls[i].vX>0){
						balls[i].vY=-balls[i].vY;
						return true;
					}				
					if(balls[i].vX<=0){
						balls[i].vX=2;
						balls[i].vY=2;						
						return true;
					}
					balls[i].vX=-balls[i].vX;
					balls[i].vY=-balls[i].vY;
					return true;
				}
			}				
			return false;
		}			
	}
}

function Patron(color,x, y, width, height, value) {	
    this.color = '#cc1b00'; 
    this.x = x; 
    this.y = y; 
    this.width = width; 
    this.height = height; 
	this.value = value;
    this.draw = function()
    {
        context.fillStyle = this.color;
		context.fillRect(this.x+bonus.visible, this.y, this.width, this.height);
    };
}

function creaturePatron(){ 
	if(bonus.ammunition>0){
		if(bonus.ammunition<10){
			for(i in bullets){
				if(bullets[i].value==0){
					bullets[i].value=1;
					bullets[i].x=pistol[0].x;
					bullets[i].y=pistol[0].y;
					bonus.timerShot=20;
					bonus.ammunition--;
					return;
				}
			}
			if(bonus.patrons<15){
				bullets[bonus.patrons]= new Patron('#cc1b00',pistol[0].x, pistol[0].y, pistol[0].width, pistol[0].height,1);
				bullets[bonus.patrons].value=1;
				bonus.timerShot=20;
				bonus.patrons++;
				bonus.ammunition--;
			}
			return;
		}
		if(bonus.ammunition>9){			
			id1=-1;
			for(i in bullets){				
				if(bullets[i].value==0){					
					if(id1>-1){
						bullets[id1].value=1;
						bullets[id1].x=pistol[0].x;
						bullets[id1].y=pistol[0].y;
						bullets[i].value=1;
						bullets[i].x=pistol[1].x;
						bullets[i].y=pistol[1].y;
						bonus.ammunition--;
						bonus.timerShot=20;						
						return;						
					}
					if(id1<0){
						id1=i;						
					}
				}
			}				
			if(bonus.patrons<15){			
				if(id1<0){								
					bullets[bonus.patrons]= new Patron('#cc1b00',pistol[0].x, pistol[0].y, pistol[0].width, pistol[0].height,1);
					bonus.patrons++;					
				}
				if(id1>=0){					
					bullets[id1].value=1;
					bullets[id1].x=pistol[0].x;
					bullets[id1].y=pistol[0].y;
				}				
				bullets[bonus.patrons]= new Patron('#cc1b00',pistol[1].x, pistol[1].y, pistol[1].width, pistol[1].height,1);			
				bonus.patrons++;
				bonus.ammunition--;
				bonus.timerShot=20;
				return;
			}
		}
	}	
}

function hitPatr(){ 
	for(j in bullets){		
	destruction=true;
		if(bullets[j].value!=0){
			for(i in cells){
				if(cells[i].value>0){
					if(bullets[j].x+bullets[j].width/2>=cells[i].x && bullets[j].x+bullets[j].width/2<=cells[i].x+cells[i].width && bullets[j].y<=cells[i].y+cells[i].height){
						bullets[j].value=0; 
						if(cells[i].value!=10){
							cells[i].value--;
							if(cells[i].value==0){
								score(10,i);
								selectBon(i);								
							}
						}
						break;
					}
				}				
			}
		}
	}	
}

function Variables(belay, life, ammunition, magnit, score){
	this.color ="#ffd700";
	this.belay=belay; 
	this.kasaniy=0;	
	this.life = life; 
	this.ammunition = ammunition;
	this.score =score;
	this.speed = 1;
	this.timeSpeed=0;
	this.visible=0;
	this.fallBon=0;
	this.patrons=0;
	this.timerShot=0;
	this.widthCell=0;
	this.activBal=1;
	this.flag=false;
	this.draw = function()
	{
		context.globalAlpha = 1;
		context.font= '10px sans-serif';
		context.fillStyle = this.color;
		context.fillRect(game.width, game.y, 100, game.height);
		context.textBaseline = 'top';
		context.fillStyle = '#000';	
		context.fillText("speed = "+bonus.speed, game.width+5, 0);
		context.fillText("vY = "+balls[0].vY, game.width+5, 10);
		context.fillText("vX = "+balls[0].vX, game.width+5, 20);		
		context.fillText("XP = "+bonus.life, game.width+5, 30);		
		context.fillText("ammun = "+bonus.ammunition, game.width+5, 50);
		context.fillText("x5 = "+player.x2, game.width+5, 60);
		context.fillText("x4 = "+bonus.x4, game.width+5, 70);
		context.fillText("kursor = "+bonus.x3, game.width+5, 80);
		context.fillText("visible = "+bonus.visible, game.width+5, 90);
		context.fillText("score = "+bonus.score, game.width+5, 110);
	};
}

function DownBonus(x,y,value, mode){
	this.x=x;
	this.y=y;
	this.width=20;
	this.height=10;
	this.value=value;
	this.mode=mode;
	this.draw = function()
	{
		switch (this.mode){
			case 1://длинна платформы
				if(this.value<0){
					context.fillStyle = '#00F';
				}else{
					context.fillStyle = '#0CF';
				}
				context.fillRect(this.x+bonus.visible, this.y, this.width,this.height);
				break
			case 2:			
				context.fillStyle = '#CF0';
				context.fillRect(this.x+bonus.visible, this.y, this.width,this.height);
				break				
			case 3:
				context.fillStyle='#FFF';
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.width/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();
				if(this.value<0){					
					context.fillStyle = '#FF0';
				}else{					
					context.fillStyle = '#00F';
				}	
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.height/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();
				break
			case 4:
				context.fillStyle='#F60';
				context.fillRect(this.x+bonus.visible, this.y, this.width,this.height);
				break
			case 5:	
				context.fillStyle='#FFF';
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.width/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();				
				context.fillStyle = '#F60';				
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.height/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();
				break
			case 6:
				context.fillStyle='#aaa';
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.width/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();	
				context.globalAlpha = 0.5;				
				context.fillStyle = '#fff';				
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.height/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();
				context.globalAlpha = 1;
				break
			case 7:
				context.fillStyle='#888';
				context.beginPath();
				context.arc(this.x+bonus.visible, this.y, this.height/2, 0 * Math.PI, 360 * Math.PI, true);
				context.fill();				
				break	
		}
	};
}

function check(){
	if(player.longPlatform>1.5){
		player.longPlatform=1.5;
	}
	if(player.longPlatform<0.5){
		player.longPlatform=0.5;
	}
	if(bonus.speed>3){
		bonus.speed=3;
	}
	if(bonus.speed<0.5){
		bonus.speed=0.5;
	}
	for(i in balls){
		if(balls[i].speed>3){
			balls[i].speed=3;
		}
		if(balls[i].speed<0.5){
			balls[i].speed=0.5;
		}	
		if(balls[i].size>1.3){
			balls[i].size=1.3;
		}
		if(balls[i].size<0.8){
			balls[i].size=0.8;
		}
	}
	if(bonus.life>5){
		bonus.life=5;
	}
	if(bonus.lift<-1){
		bonus.life=-1;
	}
	if(bonus.ammunition>15){
		bonus.ammunition=15;
	}
	if(bonus.ammunition<0){
		bonus.ammunition=0;
	}
	if(probability>10){
		probability=10;
	}
}
probability=0;

function selectBon(j){	
	f=Math.floor(Math.random()*100);
	if(f>40-probability&& f<70){
		probability=0;
		valueBon=Math.floor(Math.random()*100);		
		if(valueBon>-1 && valueBon<14){			
			ots=Math.floor(Math.random()*100);
			for(i in bonMas){
				if(bonMas[i].mode==0){					
					bonMas[i].mode=1;
					bonMas[i].x=cells[j].x+cells[j].width/2-bonMas[i].width/2;
					bonMas[i].y=cells[j].y+cells[j].height/2-bonMas[i].height/2;					
					if(ots<50){
						bonMas[i].value=-1;
					}
					if(ots>49){
						bonMas[i].value=1;
					}
					return;
				}
			}
			if(bonus.fallBon<6){
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2-10, cells[j].y+cells[j].height/2-5,0,1);
				if(ots<50){
						bonMas[bonus.fallBon].value=-1;
					}
					if(ots>49){
						bonMas[bonus.fallBon].value=1;
					}
				bonus.fallBon++;				
			}
			return;
		}
		if(valueBon>13 && valueBon<30){			
			for(i in bonMas){
				if(bonMas[i].mode==0){
					bonMas[i].mode=2;
					bonMas[i].x=cells[j].x+cells[j].width/2-bonMas[i].width/2;
					bonMas[i].y=cells[j].y+cells[j].height/2-bonMas[i].height/2;
					bonMas[i].value=1;
					return;
				}
			}
			if(bonus.fallBon<6){				
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2-10, cells[j].y+cells[j].height/2-5,1,2);					
				bonus.fallBon++;
			}
			return;
		}
		if(valueBon>29 && valueBon<44){
			ots=Math.floor(Math.random()*100);		
			for(i in bonMas){
				if(bonMas[i].mode==0){
					bonMas[i].mode=3;
					bonMas[i].x=cells[j].x+cells[j].width/2;
					bonMas[i].y=cells[j].y+cells[j].height/2;
					if(ots<50){
						bonMas[i].value=-1;
					}
					if(ots>49){
						bonMas[i].value=1;
					}
					return;
				}
			}
			if(bonus.fallBon<6){				
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2, cells[j].y+cells[j].height/2,0,3);
				if(ots<50){
						bonMas[bonus.fallBon].value=-1;
					}
					if(ots>49){
						bonMas[bonus.fallBon].value=1;
					}
				bonus.fallBon++;				
			}
			return;			
		}
		if(valueBon>43 && valueBon<58){			
			for(i in bonMas){
				if(bonMas[i].mode==0){
					bonMas[i].mode=4;
					bonMas[i].x=(cells[j].x+cells[j].width/2)-bonMas[i].width/2;
					bonMas[i].y=(cells[j].y+cells[j].height/2)-bonMas[i].height/2;
					bonMas[i].value=10;
					return;
				}
			}
			if(bonus.fallBon<6){
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2-10, cells[j].y+cells[j].height/2-5,10,4);					
				bonus.fallBon++;
			}
			return;			
		}
		if(valueBon>57 && valueBon<72){
			for(i in bonMas){
				if(bonMas[i].mode==0){
					bonMas[i].mode=5;
					bonMas[i].x=cells[j].x+cells[j].width/2;
					bonMas[i].y=cells[j].y+cells[j].height/2;
					bonMas[i].value=1;
					return;
				}
			}
			if(bonus.fallBon<6){
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2, cells[j].y+cells[j].height/2,1,5);					
				bonus.fallBon++;
			}
			return;
		}	
		if(valueBon>71 && valueBon<86){			
			
			for(i in bonMas){
				if(bonMas[i].mode==0){
					bonMas[i].mode=6;
					bonMas[i].x=cells[j].x+cells[j].width/2;
					bonMas[i].y=cells[j].y+cells[j].height/2;
					bonMas[i].value=1;
					return;
				}
			}
			if(bonus.fallBon<6){
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2, cells[j].y+cells[j].height/2,1,6);					
				bonus.fallBon++;
			}
			return;
			
		}
		if(valueBon>85 && valueBon<100){
			
			for(i in bonMas){
				if(bonMas[i].mode==0){
					bonMas[i].mode=7;
					bonMas[i].x=cells[j].x+cells[j].width/2;
					bonMas[i].y=cells[j].y+cells[j].height/2;
					bonMas[i].value=1;
					return;
				}
			}
			if(bonus.fallBon<6){
				bonMas[bonus.fallBon]=new DownBonus(cells[j].x+cells[j].width/2, cells[j].y+cells[j].height/2,1,7);					
				bonus.fallBon++;
			}
			return;			
		}
	}else{
		if(probability<10){
			 +probability++;
		}
		
	}
}

function writeBon(i){
	if(bonMas[i].x+bonMas[i].width>=player.x-bonus.visible && bonMas[i].x<=player.x-bonus.visible+player.width*player.longPlatform && bonMas[i].y+bonMas[i].height>=player.y && bonMas[i].y<=player.y+player.height){
		switch (bonMas[i].mode){
			case 1:
				if(bonMas[i].value==1){
					if(player.longPlatform<1.5){
						player.x=player.x-player.width*0.5/2;
						player.longPlatform+=0.5;
						if(player.x<10){
							player.x=10;
						}
						if(player.x+player.width*player.longPlatform>game.width-10){
							player.x=game.width-player.width*player.longPlatform-10;
						}
					}
				}
				if(bonMas[i].value==-1){
					if(player.longPlatform>0.5){
						player.x=player.x+player.width*0.5/2; 
						player.longPlatform-=0.5;								
					}
				}
				bonMas[i].mode=0;
				break
			case 2:		
				bonus.belay=true;				
				bonMas[i].mode=0;
				break
			case 3:
				for(j in balls){
					if(balls[j].speed<3){
						if(bonMas[i].value>0 && balls[j].size<1.3){
							balls[j].size+=0.1;
							bonMas[i].mode=0;
							break
						}
						if(bonMas[i].value<0 && balls[j].size>0.8){
							balls[j].size-=0.2;
							bonMas[i].mode=0;
							break
						}
					}
				}	
				bonMas[i].mode=0;
				break
			case 4:
				bonus.ammunition+=3;
				bonMas[i].mode=0;
				break
			case 5:
				if(bonus.life<5){
					bonus.life++;
				}
				bonMas[i].mode=0;
				break
			case 6:
				if(bonus.activBal<6){
					var key = [];
					for(f in balls)
						if(balls[f].activ){
							key.push(+f);
						}
					
					for(f in key){
						for(f2 in balls){
							if(!balls[f2].activ){
								balls[f2].activ=true;
								balls[f2].through=true;
								balls[f2].kasaniy=balls[key[f]].kasaniy;
								balls[f2].size=balls[key[f]].size;
								balls[f2].speed=balls[key[f]].speed;								
								balls[f2].x=balls[key[f]].x;
								balls[f2].y=balls[key[f]].y;
								balls[f2].vX=balls[key[f]].vX;
								balls[f2].vY=balls[key[f]].vY;
								grade=Math.acos(balls[key[f]].vX*1000/2830)*180/Math.PI;
								if(balls[key[f]].vY<0){
									grade=-grade;
								}
								balls[key[f]].vX=Math.floor(Math.cos((grade+22.5)*Math.PI/180)*2830)/1000;
								balls[key[f]].vY=Math.floor(Math.sin((grade+22.5)*Math.PI/180)*2830)/1000;
								balls[f2].vX=Math.floor(Math.cos((grade-22.5)*Math.PI/180)*2830)/1000;
								balls[f2].vY=Math.floor(Math.sin((grade-22.5)*Math.PI/180)*2830)/1000;								
								bonus.activBal++;
								break;
							}							
						}
					}
					key=null;
				}
				bonMas[i].mode=0;
				break
			case 7:
				for(f in balls){
					balls[f].activ=false;
					bonus.activBal--;
				}
				break
		}				
	}
}

function update() {	
	if(!start){		
		balls[0].x=player.x+player.width*player.longPlatform/2-bonus.visible; 
		balls[0].y=player.y-balls[0].radius*balls[0].size;
	}
	checkBalls=0;
	for(i in balls){
		if(balls[i].activ){
			if(bonus.widthCell*40>game.width){
				if(balls[i].x-balls[i].radius*balls[i].size+balls[i].vX<(game.width-bonus.widthCell*40)/2){
					balls[i].vX=-balls[i].vX;		
				}
				if(balls[i].x+balls[i].radius*balls[i].size+balls[i].vX>game.width+(bonus.widthCell*40-game.width)/2){
					balls[i].vX=-balls[i].vX;
				}	
			}else{
				if(balls[i].x-balls[i].radius*balls[i].size+balls[i].vX<0 || balls[i].x+balls[i].radius*balls[i].size+balls[i].vX>game.width){
					balls[i].vX=-balls[i].vX;		
				}
			}
			if(balls[i].y-balls[i].radius*balls[i].size+balls[i].vY<0){
				balls[i].vY=-balls[i].vY;		
			}
			if(balls[i].y>game.height-balls[i].radius*balls[i].size){
				if(bonus.belay){
					balls[i].vY=-balls[i].vY;
					bonus.belay=false;
				}else{
					if(balls[i].y>game.height+balls[i].radius*balls[i].size){
						balls[i].activ=false;	
						bonus.activBal--;
					}					
				}					
			}
			if(balls[i].x+balls[i].radius*balls[i].size>=player.x-bonus.visible && balls[i].x-balls[i].radius*balls[i].size<=player.x-bonus.visible+player.width*player.longPlatform && balls[i].y+balls[i].radius*balls[i].size>=player.y){				
				if(start){
					direction(i);
					balls[i].kasaniy++;
				}
			}
			k=0;
			for(j in cells){
				flagDel=false;
				if(cells[j].value!=0){			
					if(obstacle(i, j)){
						if(cells[j].value!=10 && balls[i].speed<2.9){ 
							cells[j].value--;
						}
						flagDel=true;
					}
					if(cells[j].value==0){
						k=i;
						selectBon(j);						
						i=k;
						score(i,j);
						
					}
				+k++;					
				}				
				if(flagDel){
					break;
				}	
			}	
			checkBalls++;
			if(balls[i].kasaniy>4 && balls[i].speed<2.9){		
					balls[i].speed+=0.2;
					balls[i].kasaniy=0;
			}
			balls[i].x =balls[i].x+( balls[i].vX*balls[i].speed);	
			balls[i].y =balls[i].y+( balls[i].vY*balls[i].speed);
		}
	}
	hitPatr();	
	for(i in bullets){
		if(bullets[i].value!=0){
			if(bullets[i].y<0){
				bullets[i].value=0;
			}
			bullets[i].y-=5*bonus.speed;
		}
	}
	for(i in bonMas){
		if(bonMas[i].mode!=0){			
			bonMas[i].y+=2*bonus.speed;
			if(bonMas[i].y>game.height+2*bonus.speed+bonMas[i].width){
				bonMas[i].mode=0;
			}
			writeBon(i);			
		}
	}
	if(start){
		bonus.timeSpeed++;
		if(bonus.timeSpeed>1000){
			bonus.timeSpeed=0;
			bonus.speed+=0.2;
		}
	}
	bonus.timerShot--;
	if(bonus.timerShot<1 && bonus.ammunition>0){
		canvas.onclick=creaturePatron;
	}	
	for(i in bullets){
		if(bullets[i].y+bullets[i].height<0){
			bullets[i].value=0;
		}
	}	
	if(checkBalls==0){
		if(bonus.life!=0){
			stopGame();			
		}else{
			bonus.flag=false;
			gameOver(false);
		}
	}
	if(k==0){
		bonus.flag=true;
		gameOver(true);
	}
}

function draw() {	
	game.draw();		
	if(bonus.ammunition>0){		
		if(bonus.ammunition<10){			
			if(!window.pistol[0]){				
				pistol[0] = new Patron('#ff2400', player.x+player.width*player.longPlatform/2-4, player.y-5, 4, player.height+3);
			}
			pistol[0].x=player.x-1+player.width*player.longPlatform/2-bonus.visible;	
			pistol[0].draw();			
		}
		if(bonus.ammunition>9){
			if(!window.pistol[1]){
				pistol[1] = new Patron('#ff2400',player.x+player.width*player.longPlatform, player.y-5, 4, player.height+3);
			}
			pistol[0].x=player.x-4-bonus.visible;
			pistol[1].x=player.x+player.width*player.longPlatform-bonus.visible;
			pistol[0].draw();
			pistol[1].draw();
		}
	}	
	for(i in balls){
		if(balls[i].activ==true){
			balls[i].draw();	
			player.draw();
		}
	}
	for(i in cells){
		if(cells[i].value!=0){		
			cells[i].draw();
		}
	}
	for(i in bonMas){		
		if(bonMas[i].mode!=0){		
			bonMas[i].draw();
		}
	}
	for(i in bullets){
		if(bullets[i].value!=0){			
			bullets[i].draw();
		}		
	}
	player.draw();
	bonus.draw();
}

function play() {
	if(!endGame){
		check(); 
		position();
		update();
		draw();
	}else{
		gameOver(bonus.flag);
	}
    
}

function score(weapon,cell){
	bonus.score=bonus.score+cells[cell].score;
	bonus.score=weapon==10 ? bonus.score+1 
	: balls[weapon].speed==3 ? bonus.score+20 
	: bonus.score+Math.floor(balls[weapon].speed)*3;
}

function startGame(){	
	if(!start){
		start = true;
		direction(0);		
	}	
}

function stopGame(){
	start=false;
	balls[0].activ=true;
	bonus.activBal++;
	bonus.ammunition=0;
	balls[0].vY=0;
	balls[0].vX=0;
	balls[0].speed=1;
	balls[0].kasaniy=0;
	balls[0].size=1;
	bonus.belay=false;
	bonus.visible=0;
	bonus.timerShot=0;
	bonus.timeSpeed=0
	player.x=(game.width-player.width*player.longPlatform)/2;
	player.x2=game.width/2;
	bonus.life--;		
	for(i in bonMas){
		bonMas[i].mode=0;
	}	
	for(i in bullets)
		bullets[i].value=0;
	canvas.onclick =startGame;
}

function gameOver(flag){
	endGame=true;
	if(flag){
		context.font= 'bold 60px courier';
		context.textAlign = 'center';
		context.fillStyle = "#ccc";
		context.globalAlpha = 0.6;		
		context.fillText("Game Over", game.width/2, game.height/2-50);
		context.font= 'bold 32px courier';
		context.fillText("Victory", game.width/2, game.height/2+10);
		context.fillText("Score: "+bonus.score, game.width/2, game.height/2+40);		
		context.textAlign='start';			
	}else{
		context.font= 'bold 60px courier';
		context.textAlign = 'center';
		context.fillStyle = "#ccc";
		context.globalAlpha = 0.6;		
		context.fillText("Game Over", game.width/2, game.height/2-50);
		context.font= 'bold 32px courier';
		context.fillText("Defeat", game.width/2, game.height/2+10);
		context.fillText("Score: "+bonus.score, game.width/2, game.height/2+40);		
		context.textAlign='start';
		
		
	}
}

var cells=[];
var balls=[];
var pistol=[];
bullets=[];
bonMas=[];

function init() {		
	game = new Rect("#000", 0, 0, 640, 480);		
	player = new Platform(game.width /2-40, game.height -15, 80, 10);
	bonus= new Variables(false,3,0,false,0);	
	
	
	n=[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	];
	nach=0;
	bonus.widthCell=n[0].length;
	bonus.heightCell=n.length;
	nach=(game.width-n[0].length*40)/2;
	bonus.x3=0;
	bonus.x4=0;
	bonus.x5=0;
	bonus.visible=0;
	for(i in n){
		pust=0;
		for(j in n[i]){
			if(n[i][j]==-1){
				pust++;
				cells[+i*n[i].length+ +j]=new Cell(nach+(40*j)-(20*pust),20+(10*i), 40,10,0, pust);
				
			}else{
				cells[+i*n[i].length+ +j]=new Cell(nach+(40*j)-(20*pust),20+(10*i), 40,10,n[i][j], pust);
			}			
		}
	}	
	player.x=game.width /2-40-bonus.visible;	
	for(i=0;i<10;i++){
		balls[i] = new Ball(game.width /2-10, game.height - 20, 0, 0, 5, 1, 1);
	}
	balls[0].activ=true;
	start =false;
	endGame=false;
    canvas = document.getElementById("arkanoid");
    canvas.width = game.width+100;
    canvas.height = game.height; 
    context = canvas.getContext('2d');
	canvas.onmousemove = playerMove;
	canvas.onclick =startGame;
	setInterval(play, 1000 / 50);    
}