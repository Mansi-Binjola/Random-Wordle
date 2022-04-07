# Random Wordle
[![Random Wordle](https://user-images.githubusercontent.com/43286654/162247258-965e66ae-92df-4faf-af51-c2b035fada5d.png)](https://youtu.be/g5lFWaZqdxg)

## Inspiration
Wordle is a web-based word game created and developed by Welsh software engineer Josh Wardle, and owned and published by The New York Times. It is a very popular game and has been played all around the world. The Wordle is good but for people who wants to play more than ones have to wait each day to get a new word. Also when the word is found in end, many of them are complicated and hence have to browse it for the meaning. So I made Random Wordle.

## What it does
Random Wordle game is very much similar to original Wordle and the UI design is also similar. The only difference between them is that, Random Wordle will provide the meaning of the word at the end and the game can be played unlimited times. We can also see beautiful confetti shower when you guess the word right.

## How we built it
The basic UI and the design of the wordle is been used from this [repo](https://github.com/DoubleDebug/wordle-speedrun). What I did was to use these three APIs
-  **Random Word API** [link](https://random-word-api.herokuapp.com/home)

Used for generating a five letter word.

- **Free Dictionary API** [link](https://dictionaryapi.dev/)

Used to validate the user entered word and get the meaning of the word.

- **Confetti canvas API** [link](https://github.com/catdad/canvas-confetti)

When the word is guessed right, confetti shower is popped up. 

