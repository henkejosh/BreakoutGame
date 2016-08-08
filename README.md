# Breakout

[Play Breakout] (https://henkejosh.github.io/BreakoutGame/)

## Description
A remake of the classic Atari game - your goal is to destroy all of a level's bricks by bouncing the ball into them - set in diverse and beautiful locations across the world.

##Summary
###Structure
Built using:
* Javascript
* Canvas
* CSS
* HTML

Sticking to Object Oriented Programming design principles, I used a Game class to house all the game play logic, render the other components, and handle some of the more advanced collision detection.

Additionally, I used the following classes to represent the objects in the game, each primarily responsible for storing its state (current positional coordinates, size, velocity, color, etc.) and drawing itself on render:  
1. Game
2. Ball
3. Paddle
4. Brick
5. Instructions Menu/Modal
