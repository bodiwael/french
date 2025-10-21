import React, { useState, useEffect } from 'react';
import { BookOpen, Zap, Trophy, Star, Check, X, Volume2, ArrowRight, RefreshCw, Brain, Target, Sparkles } from 'lucide-react';

const FrenchLearningHub = () => {
  const [currentExercise, setCurrentExercise] = useState('menu');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);

  // Exercise data
  const exercises = {
    grammar: {
      title: "Grammar Mastery",
      icon: BookOpen,
      color: "from-blue-500 to-purple-600",
      exercises: [
        {
          type: "fill-blank",
          question: "Complete with car, parce que, or puisque:",
          sentence: "Je ne suis pas venu ___ j'étais malade.",
          answer: "parce que",
          hint: "Used to explain a reason"
        },
        {
          type: "conjugation",
          question: "Put the verb 'peindre' in the present tense:",
          prompts: ["je", "tu", "il/elle"],
          answers: ["peins", "peins", "peint"]
        },
        {
          type: "conditional",
          question: "Transform to conditional:",
          sentence: "Je veux partir.",
          answer: "Je voudrais partir.",
          hint: "Use the polite form"
        }
      ]
    },
    environment: {
      title: "Environment & Technology",
      icon: Zap,
      color: "from-green-500 to-teal-600",
      exercises: [
        {
          type: "match-definition",
          question: "Match the terms with definitions:",
          pairs: [
            { term: "recycler", definition: "To reuse materials" },
            { term: "pollution atmosphérique", definition: "Air contamination" },
            { term: "énergies renouvelables", definition: "Solar and wind power" }
          ]
        },
        {
          type: "debate",
          question: "Complete the argument:",
          prompt: "Pour sauver la planète, il faut...",
          options: [
            "utiliser les énergies renouvelables",
            "recycler les déchets",
            "économiser l'énergie",
            "changer de voiture"
          ]
        }
      ]
    },
    reading: {
      title: "Reading Comprehension",
      icon: Brain,
      color: "from-orange-500 to-red-600",
      exercises: [
        {
          type: "true-false",
          passage: "La pollution atmosphérique est causée par les industries et les systèmes de transport qui produisent des gaz toxiques.",
          questions: [
            { q: "Les industries polluent l'atmosphère", answer: true },
            { q: "L'air pollué n'est pas dangereux", answer: false },
            { q: "Les transports contribuent à la pollution", answer: true }
          ]
        }
      ]
    },
    speaking: {
      title: "Speaking Practice",
      icon: Volume2,
      color: "from-pink-500 to-purple-600",
      exercises: [
        {
          type: "pronunciation",
          phrases: [
            "Je voudrais commander",
            "Bonne idée!",
            "C'est vrai!",
            "Agir pour le monde"
          ]
        }
      ]
    }
  };

  const GrammarExercise = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [shaking, setShaking] = useState(false);

    const ex = exercises.grammar.exercises[currentQ];

    const checkAnswer = () => {
      if (ex.type === 'fill-blank') {
        const correct = answer.toLowerCase().trim() === ex.answer.toLowerCase();
        if (correct) {
          setFeedback({ type: 'success', message: 'Excellent! 🎉' });
          setScore(score + 10);
          setStreak(streak + 1);
          triggerParticles();
        } else {
          setFeedback({ type: 'error', message: `Try again! Hint: ${ex.hint}` });
          setShaking(true);
          setTimeout(() => setShaking(false), 500);
        }
      }
    };

    return (
      <div className="space-y-6 animate-slideIn">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">{ex.question}</h3>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <p className="text-lg mb-4">{ex.sentence}</p>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`w-full p-4 border-2 rounded-xl text-lg transition-all ${
                shaking ? 'animate-shake border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Type your answer..."
            />
          </div>
          <button
            onClick={checkAnswer}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Check Answer
          </button>
          {feedback && (
            <div className={`mt-4 p-4 rounded-xl animate-bounce ${
              feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    );
  };

  const EnvironmentExercise = () => {
    const [draggedItem, setDraggedItem] = useState(null);
    const [matches, setMatches] = useState({});
    const [hoveredZone, setHoveredZone] = useState(null);

    const ex = exercises.environment.exercises[0];
    const terms = ex.pairs.map(p => p.term);
    const definitions = ex.pairs.map(p => p.definition);

    return (
      <div className="space-y-6 animate-fadeIn">
        <h3 className="text-2xl font-bold text-green-800 mb-6">Match the Terms!</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Terms */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-700">French Terms</h4>
            {terms.map((term, i) => (
              <div
                key={i}
                draggable={!matches[term]}
                onDragStart={() => setDraggedItem(term)}
                className={`p-4 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl cursor-move hover:scale-105 transition-transform shadow-lg ${
                  matches[term] ? 'opacity-50' : 'animate-pulse'
                }`}
              >
                <span className="font-bold">{term}</span>
              </div>
            ))}
          </div>

          {/* Definitions */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-700">Definitions</h4>
            {definitions.map((def, i) => {
              const matchedTerm = Object.keys(matches).find(k => matches[k] === def);
              return (
                <div
                  key={i}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHoveredZone(def);
                  }}
                  onDragLeave={() => setHoveredZone(null)}
                  onDrop={() => {
                    if (draggedItem) {
                      const correct = ex.pairs.find(p => p.term === draggedItem)?.definition === def;
                      if (correct) {
                        setMatches({...matches, [draggedItem]: def});
                        setScore(score + 15);
                        triggerParticles();
                      }
                    }
                    setHoveredZone(null);
                  }}
                  className={`p-4 rounded-xl border-2 border-dashed transition-all ${
                    matchedTerm 
                      ? 'bg-green-100 border-green-500' 
                      : hoveredZone === def 
                        ? 'bg-blue-100 border-blue-500 scale-105' 
                        : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  {matchedTerm && <div className="text-green-800 font-bold mb-2">✓ {matchedTerm}</div>}
                  <div className="text-gray-700">{def}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ReadingExercise = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const ex = exercises.reading.exercises[0];

    const checkAnswers = () => {
      let correct = 0;
      ex.questions.forEach((q, i) => {
        if (answers[i] === q.answer) correct++;
      });
      setScore(score + correct * 5);
      setShowResults(true);
    };

    return (
      <div className="space-y-6 animate-slideIn">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
          <h3 className="text-2xl font-bold mb-4 text-orange-800">Read and Answer</h3>
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <p className="text-lg leading-relaxed">{ex.passage}</p>
          </div>
          
          <div className="space-y-4">
            {ex.questions.map((q, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md">
                <p className="font-semibold mb-3">{q.q}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAnswers({...answers, [i]: true})}
                    className={`flex-1 p-3 rounded-lg font-bold transition-all ${
                      answers[i] === true 
                        ? 'bg-green-500 text-white scale-105' 
                        : 'bg-gray-100 hover:bg-green-100'
                    }`}
                  >
                    <Check className="inline mr-2" size={20} />
                    Vrai
                  </button>
                  <button
                    onClick={() => setAnswers({...answers, [i]: false})}
                    className={`flex-1 p-3 rounded-lg font-bold transition-all ${
                      answers[i] === false 
                        ? 'bg-red-500 text-white scale-105' 
                        : 'bg-gray-100 hover:bg-red-100'
                    }`}
                  >
                    <X className="inline mr-2" size={20} />
                    Faux
                  </button>
                </div>
                {showResults && (
                  <div className={`mt-2 p-2 rounded ${answers[i] === q.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {answers[i] === q.answer ? '✓ Correct!' : '✗ Wrong'}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!showResults && (
            <button
              onClick={checkAnswers}
              className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Submit Answers
            </button>
          )}
        </div>
      </div>
    );
  };

  const SpeakingExercise = () => {
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const ex = exercises.speaking.exercises[0];

    const playPronunciation = (phrase) => {
      setSelectedPhrase(phrase);
      setIsPlaying(true);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.8;
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
      }
      
      setTimeout(() => setIsPlaying(false), 2000);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <h3 className="text-2xl font-bold text-pink-800 mb-6">Practice Speaking!</h3>
        
        <div className="grid gap-4">
          {ex.phrases.map((phrase, i) => (
            <button
              key={i}
              onClick={() => playPronunciation(phrase)}
              className={`group p-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl hover:scale-105 transition-all shadow-lg ${
                isPlaying && selectedPhrase === phrase ? 'animate-pulse scale-105' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{phrase}</span>
                <Volume2 
                  className={`${isPlaying && selectedPhrase === phrase ? 'animate-bounce' : ''}`} 
                  size={32} 
                />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
          <h4 className="font-bold text-lg mb-3">💡 Speaking Tips:</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Listen carefully to the pronunciation</li>
            <li>• Try to repeat after hearing</li>
            <li>• Pay attention to the accent</li>
            <li>• Practice daily for best results!</li>
          </ul>
        </div>
      </div>
    );
  };

  const triggerParticles = () => {
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const MenuScreen = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse">
          French Learning Hub
        </h1>
        <p className="text-xl text-gray-600">Choose your exercise and start learning!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(exercises).map(([key, ex]) => {
          const Icon = ex.icon;
          return (
            <button
              key={key}
              onClick={() => setCurrentExercise(key)}
              className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-purple-500"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${ex.color} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                <Icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                {ex.title}
              </h3>
              <p className="text-gray-600">Click to start →</p>
            </button>
          );
        })}
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white text-center shadow-lg">
          <Trophy size={32} className="mx-auto mb-2 animate-bounce" />
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-sm">Total Score</div>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-teal-500 p-6 rounded-2xl text-white text-center shadow-lg">
          <Zap size={32} className="mx-auto mb-2 animate-pulse" />
          <div className="text-3xl font-bold">{streak}</div>
          <div className="text-sm">Streak</div>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-6 rounded-2xl text-white text-center shadow-lg">
          <Star size={32} className="mx-auto mb-2 animate-spin-slow" />
          <div className="text-3xl font-bold">A+</div>
          <div className="text-sm">Grade</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-40 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-particle pointer-events-none"
          style={{left: `${p.x}%`, top: `${p.y}%`}}
        >
          <Sparkles size={16} />
        </div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Back Button */}
        {currentExercise !== 'menu' && (
          <button
            onClick={() => setCurrentExercise('menu')}
            className="mb-6 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <ArrowRight className="rotate-180" size={20} />
            <span className="font-bold">Back to Menu</span>
          </button>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {currentExercise === 'menu' && <MenuScreen />}
          {currentExercise === 'grammar' && <GrammarExercise />}
          {currentExercise === 'environment' && <EnvironmentExercise />}
          {currentExercise === 'reading' && <ReadingExercise />}
          {currentExercise === 'speaking' && <SpeakingExercise />}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes particle {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-particle {
          animation: particle 1s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FrenchLearningHub;
