import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native';


const Hangman = () => {
  const [word, setWord] = useState('');
  const words = require('./words');
  const [guesses, setGuesses] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [hangmanIndex, setHangmanIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = (letter) => {
    if (!gameOver && !guesses.includes(letter)) {
      const newGuesses = [...guesses, letter];
      setGuesses(newGuesses);
      if (!word.includes(letter)) {
        setHangmanIndex(hangmanIndex + 1);
        if (hangmanIndex === 5) {
          setGameOver(true);
        }
      }
      if (word.split('').every((letter) => newGuesses.includes(letter))) {
        setGameWon(true);
        setGameOver(true);
      }
    }
    setDisabledLetters([...disabledLetters, letter]);
  };

  const hangmanImages = [
    require('./assets/hangman-0.png'),
    require('./assets/hangman-1.png'),
    require('./assets/hangman-2.png'),
    require('./assets/hangman-3.png'),
    require('./assets/hangman-4.png'),
    require('./assets/hangman-5.png'),
    require('./assets/hangman-6.png'),
  ];

  
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const getDisplayWord = () => {
    let displayWord = '';
    for (let i = 0; i < word.length; i++) {
      if (guesses.includes(word[i])) {
        displayWord += word[i];
      } else {
        displayWord += '_';
      }
      if (i < word.length - 1) {
        displayWord += ' ';
      }
    }
    return displayWord.replace(new RegExp(guesses.join('|'), 'g'), letter => ` ${letter} `);
  };

  const renderLetter = (letter) => {
    return (
      <TouchableOpacity
        key={letter}
        style={[styles.button, disabledLetters.includes(letter) && styles.disabledButton]}
        onPress={() => handleGuess(letter)}
        disabled={gameOver || guesses.includes(letter) || gameWon}
      >
        <Text style={styles.letter}>{letter}</Text>
      </TouchableOpacity>
    );
  };

  const renderGuessArea = () => {
    const displayWord = getDisplayWord();
    const letters = displayWord.split(' ');
  
    if (gameWon) {
      return <Text style={styles.message}>Congratulations! You won!</Text>;
    }
  
    return (
      <View style={styles.guessArea}>
        {letters.map((letter, index) => {
          return (
            <Text key={index} style={[styles.letter, styles.guessLetter]}>
              {letter}
            </Text>
          );
        })}
      </View>
    );
  };
  


  const handleNewGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setGuesses([]);
    setDisabledLetters([]);
    setHangmanIndex(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <View style={styles.container}>
  <Text style={styles.word}>{getDisplayWord()}</Text>
  <View style={styles.imageContainer}>
    <Image source={hangmanImages[hangmanIndex]} style={styles.image} />
  </View>
  {renderGuessArea()}
  <View style={styles.buttons}>
    {letters.map((letter) => renderLetter(letter))}
  </View>
  {gameOver && hangmanIndex === 6 && (
    <Text style={styles.message}>You lost! The word was {word}.</Text>
  )}
  <Button title="New Game" onPress={handleNewGame} />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 36,
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledText: {
    color: 'gray',
    fontSize: 24,
  },
  letter: {
    color: 'white',
    fontSize: 24,
  },
  guessArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guessLetter: {
    marginRight: 10,
    marginLeft: 10,
  },
  newGameButton: {
    width: 100,
    height: 40,
    margin: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Hangman;
