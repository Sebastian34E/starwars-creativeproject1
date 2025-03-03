<script>
	import { onMount } from 'svelte';

	// Disable SSR so that the ESM-only libraries load correctly in the browser
	export const ssr = false;

	// ====== Particles (Starry Background) Setup ======
	let Particles = null;
	let particlesOptions = {
		preset: 'stars',
		particles: {
			number: {
				value: 600 // Adjust as desired
			}
		}
	};

	onMount(async () => {
		// Load the tsParticles engine and stars preset
		const { tsParticles } = await import('tsparticles-engine');
		const { loadStarsPreset } = await import('tsparticles-preset-stars');
		loadStarsPreset(tsParticles);

		// Dynamically load the Svelte wrapper so it runs only in the browser
		const module = await import('svelte-particles');
		Particles = module.default;
	});

	// ====== Quiz Logic Setup ======
	const questions = [
		{
			prompt: 'If someone insults you, how do you react?',
			answers: [
				{ text: 'Laugh it off or throw back a witty one-liner.', character: 'Han Solo' },
				{
					text: 'Deliver a sharp comeback with an icy stare to shut them down.',
					character: 'Princess Leia'
				},
				{
					text: 'Stand up for myself calmly without escalating the situation.',
					character: 'Luke Skywalker'
				},
				{
					text: 'Intimidate them into silence (perhaps with a deathly glare).',
					character: 'Darth Vader'
				},
				{
					text: "Let out a menacing growl and show them it's a bad idea to mess with me.",
					character: 'Chewbacca'
				}
			]
		},
		{
			prompt: 'What motivates you to keep going?',
			answers: [
				{ text: "Protecting the innocent and doing what's right.", character: 'Luke Skywalker' },
				{ text: 'Loyalty to my friends and family above all else.', character: 'Chewbacca' },
				{
					text: 'Keeping my freedom and looking out for number one (with some profit on the side).',
					character: 'Han Solo'
				},
				{ text: 'Gaining more power and control over everything.', character: 'Emperor Palpatine' },
				{ text: 'Duty to a greater cause and those who depend on me.', character: 'Princess Leia' }
			]
		},
		{
			prompt: 'How do you approach a new challenge or mission?',
			answers: [
				{ text: 'Charge in head-on with a hopeful attitude.', character: 'Luke Skywalker' },
				{ text: "Improvise as I go – I'll figure it out on the fly.", character: 'Han Solo' },
				{ text: 'Make a solid plan first and get everyone organized.', character: 'Princess Leia' },
				{
					text: 'Think of a clever, sneaky solution before confronting it directly.',
					character: 'Obi-Wan Kenobi'
				},
				{ text: 'Be patient and seek guidance or insight before taking action.', character: 'Yoda' }
			]
		},
		{
			prompt: "What's your idea of a good time?",
			answers: [
				{
					text: 'Practicing my skills or taking a quick flight looking for adventure.',
					character: 'Luke Skywalker'
				},
				{
					text: 'Winning a high-stakes game in a cantina and celebrating after.',
					character: 'Han Solo'
				},
				{
					text: 'Relaxing with close friends, maybe playing a game of holochess.',
					character: 'Chewbacca'
				},
				{ text: 'Enjoying some peace and quiet to meditate and reflect.', character: 'Yoda' },
				{ text: 'Throwing a big party and charming all the guests.', character: 'Lando Calrissian' }
			]
		},
		{
			prompt: 'Your spaceship is stranded with a mechanical problem. What do you do?',
			answers: [
				{
					text: 'Grab the tools and try to fix it myself (with a few choice curse words for good measure!).',
					character: 'Han Solo'
				},
				{
					text: 'Growl in frustration, then roll up my sleeves and start repairing it by hand.',
					character: 'Chewbacca'
				},
				{
					text: 'Try a quick fix with what I know, and call for a friend or droid to help if needed.',
					character: 'Luke Skywalker'
				},
				{
					text: 'Glare and demand the nearest mechanic fix it immediately — or else.',
					character: 'Darth Vader'
				},
				{
					text: 'Stay calm and improvise a temporary solution, or find an alternate way to reach my destination.',
					character: 'Obi-Wan Kenobi'
				},
				{
					text: 'Charm a passerby into helping out or hitch a ride on their ship.',
					character: 'Lando Calrissian'
				}
			]
		},
		{
			prompt: 'What quality do you value most in your allies?',
			answers: [
				{ text: 'Loyalty and a kind heart.', character: 'Luke Skywalker' },
				{ text: 'Bravery and dedication to our cause.', character: 'Princess Leia' },
				{ text: 'Reliability – someone who will always have my back.', character: 'Han Solo' },
				{
					text: 'Absolute obedience and following orders without question.',
					character: 'Darth Vader'
				},
				{ text: 'Wisdom and honesty.', character: 'Yoda' },
				{ text: 'Ambition and usefulness to my plans.', character: 'Emperor Palpatine' }
			]
		},
		{
			prompt: "Which of these quotes sounds like something you'd say?",
			answers: [
				{ text: '"Never tell me the odds!"', character: 'Han Solo' },
				{ text: '"Do or do not. There is no try."', character: 'Yoda' },
				{ text: '"I find your lack of faith disturbing."', character: 'Darth Vader' },
				{ text: '"Someone has to save our skins."', character: 'Princess Leia' },
				{ text: '"I believe there\'s good in everyone."', character: 'Luke Skywalker' },
				{ text: '"Everything is proceeding as I have foreseen."', character: 'Emperor Palpatine' }
			]
		},
		{
			prompt: 'How would you describe your personal style or appearance?',
			answers: [
				{ text: 'Simple and practical – no need to stand out.', character: 'Luke Skywalker' },
				{ text: 'Rugged and casual, with a confident swagger.', character: 'Han Solo' },
				{ text: 'Elegant and regal, yet always ready for action.', character: 'Princess Leia' },
				{
					text: 'All black and imposing, complete with a dramatic cape.',
					character: 'Darth Vader'
				},
				{ text: 'Armored up and ready for anything.', character: 'Boba Fett' },
				{
					text: 'Refined and stylish – I never say no to a good cape.',
					character: 'Lando Calrissian'
				}
			]
		},
		{
			prompt: "If you're put in charge of a group, how do you lead?",
			answers: [
				{
					text: 'Lead by example on the front lines to inspire everyone.',
					character: 'Luke Skywalker'
				},
				{
					text: 'Give clear orders and keep everyone focused on the mission.',
					character: 'Princess Leia'
				},
				{
					text: 'Keep it informal and friendly, and improvise if things change.',
					character: 'Han Solo'
				},
				{
					text: 'Rule with an iron fist – strict discipline and fear to stay in control.',
					character: 'Darth Vader'
				},
				{
					text: 'Guide the team with wisdom and encourage each person’s strengths.',
					character: 'Yoda'
				}
			]
		},
		{
			prompt: 'Which vehicle would you most want to travel in?',
			answers: [
				{ text: 'An X-wing starfighter – agile and battle-ready.', character: 'Luke Skywalker' },
				{
					text: 'The Millennium Falcon, of course. Fast and one-of-a-kind.',
					character: 'Han Solo'
				},
				{
					text: 'An Imperial Star Destroyer to show my might across the stars.',
					character: 'Darth Vader'
				},
				{ text: 'My personal ship loaded with hidden weapons.', character: 'Boba Fett' },
				{
					text: 'A luxury starship with style and all the comforts.',
					character: 'Lando Calrissian'
				},
				{
					text: "Whatever gets me where I'm needed safely (even an Imperial shuttle, if necessary).",
					character: 'Princess Leia'
				}
			]
		},
		{
			prompt: 'What is your greatest fear?',
			answers: [
				{ text: 'Failing to protect the people I care about.', character: 'Luke Skywalker' },
				{ text: 'Losing my freedom or being trapped with no way out.', character: 'Han Solo' },
				{ text: 'Tyranny triumphing and hope fading in the galaxy.', character: 'Princess Leia' },
				{ text: 'Being betrayed and losing my power.', character: 'Emperor Palpatine' },
				{ text: 'Losing everything I fought for and becoming powerless.', character: 'Darth Vader' }
			]
		},
		{
			prompt: "When a plan falls apart, what's your reaction?",
			answers: [
				{ text: 'Stay hopeful and find another way to succeed.', character: 'Luke Skywalker' },
				{
					text: 'Wing it! Turn the failure into an opportunity with some quick thinking.',
					character: 'Han Solo'
				},
				{
					text: 'Get angry and make sure whoever caused the problem pays for it.',
					character: 'Darth Vader'
				},
				{
					text: 'Adapt on the fly and keep everyone moving toward the goal.',
					character: 'Princess Leia'
				},
				{
					text: 'Laugh it off, pretend I meant to do that, and improvise a new plan.',
					character: 'Lando Calrissian'
				}
			]
		},
		{
			prompt: 'How would your closest friends describe you?',
			answers: [
				{ text: 'Hopeful, loyal, and optimistic.', character: 'Luke Skywalker' },
				{ text: 'Sarcastic, confident, but ultimately dependable.', character: 'Han Solo' },
				{ text: 'Strong-willed, intelligent, and caring.', character: 'Princess Leia' },
				{ text: 'Wise, patient, and selfless.', character: 'Obi-Wan Kenobi' },
				{ text: 'Loyal, brave, and protective of those I love.', character: 'Chewbacca' }
			]
		},
		{
			prompt: 'How do you usually resolve conflicts?',
			answers: [
				{
					text: 'Try diplomacy first and reason with everyone involved.',
					character: 'Princess Leia'
				},
				{
					text: 'Come up with a clever trick — or a quick draw of my blaster — to settle it.',
					character: 'Han Solo'
				},
				{
					text: 'Intimidate or overpower the other side so they stand down.',
					character: 'Darth Vader'
				},
				{
					text: 'Negotiate a deal or compromise where everyone wins (especially me).',
					character: 'Lando Calrissian'
				},
				{
					text: 'Act as a calm mediator, or even use a subtle mind trick to defuse the tension.',
					character: 'Obi-Wan Kenobi'
				}
			]
		},
		{
			prompt: 'If you suddenly discovered you can use the Force, what would you do first?',
			answers: [
				{
					text: 'Find a wise mentor to train me so I can use it to help others.',
					character: 'Luke Skywalker'
				},
				{
					text: "Shrug it off — I'd probably still trust my blaster and instincts over some magic force.",
					character: 'Han Solo'
				},
				{
					text: 'Use it to start taking control of everything and get what I want.',
					character: 'Emperor Palpatine'
				},
				{
					text: 'Practice responsibly, using it only for knowledge and defense.',
					character: 'Yoda'
				},
				{
					text: 'Keep it low-key and use it subtly to give myself an edge when I really need it.',
					character: 'Lando Calrissian'
				}
			]
		},
		{
			prompt: 'In the Star Wars universe, which job would suit you best?',
			answers: [
				{ text: 'Starfighter pilot bravely defending the galaxy.', character: 'Luke Skywalker' },
				{ text: 'Smuggler-for-hire, roaming from system to system.', character: 'Han Solo' },
				{
					text: 'Diplomat or political leader rallying others to a cause.',
					character: 'Princess Leia'
				},
				{ text: 'Bounty hunter tracking down high-value targets.', character: 'Boba Fett' },
				{ text: 'Wise mentor guiding the next generation of heroes.', character: 'Obi-Wan Kenobi' },
				{
					text: 'Galactic emperor – the one calling all the shots.',
					character: 'Emperor Palpatine'
				}
			]
		},
		{
			prompt: 'What is your biggest pet peeve?',
			answers: [
				{ text: 'Bullies who pick on the innocent or helpless.', character: 'Luke Skywalker' },
				{ text: 'Being told what to do or hearing the odds of success.', character: 'Han Solo' },
				{ text: 'Impatience and reckless behavior that create problems.', character: 'Yoda' },
				{
					text: 'Incompetence or disloyalty from those under my command.',
					character: 'Darth Vader'
				},
				{ text: 'When someone breaks a deal or double-crosses me.', character: 'Lando Calrissian' }
			]
		},
		{
			prompt: 'Where in the galaxy would you most like to spend time?',
			answers: [
				{ text: 'Somewhere quiet and green, surrounded by nature and peace.', character: 'Yoda' },
				{
					text: 'In a bustling spaceport cantina or cruising through open space.',
					character: 'Han Solo'
				},
				{
					text: 'In a command center, where I can organize plans and make a difference.',
					character: 'Princess Leia'
				},
				{
					text: 'In a beautiful city full of opportunity, enjoying the finer things.',
					character: 'Lando Calrissian'
				},
				{
					text: 'In a powerful fortress or on the bridge of a starship, overseeing everything.',
					character: 'Darth Vader'
				}
			]
		},
		{
			prompt: "You see a stranger in trouble. What's your first instinct?",
			answers: [
				{ text: 'Rush in to help immediately, no questions asked.', character: 'Luke Skywalker' },
				{
					text: 'Pretend not to notice at first, but then end up helping anyway.',
					character: 'Han Solo'
				},
				{
					text: 'Take charge of the situation and organize others to assist.',
					character: 'Princess Leia'
				},
				{
					text: "Only get involved if there's a reward or it benefits me.",
					character: 'Boba Fett'
				},
				{
					text: 'Calmly step in and resolve it quietly before it gets out of hand.',
					character: 'Obi-Wan Kenobi'
				}
			]
		},
		{
			prompt: "What's your communication style?",
			answers: [
				{ text: 'Sarcastic quips and witty one-liners.', character: 'Han Solo' },
				{
					text: 'Direct, assertive orders (with a bit of dry sarcasm when needed).',
					character: 'Princess Leia'
				},
				{
					text: 'Few words, mostly commands… and an intimidating silence.',
					character: 'Darth Vader'
				},
				{ text: 'Ancient wisdom delivered in quirky, backwards phrases.', character: 'Yoda' },
				{
					text: 'Smooth-talking with plenty of charm and flattery.',
					character: 'Lando Calrissian'
				},
				{
					text: 'Expressive growls and roars – I let my actions do most of the talking.',
					character: 'Chewbacca'
				}
			]
		},
		{
			prompt: 'In a battle, you prefer to…',
			answers: [
				{ text: 'Lead the charge and inspire everyone around you.', character: 'Luke Skywalker' },
				{
					text: 'Dive in and take out the enemy head-on with blaster blazing.',
					character: 'Han Solo'
				},
				{ text: 'Stay back a bit to coordinate the attack strategy.', character: 'Princess Leia' },
				{
					text: 'Engage the strongest enemy personally to strike fear in the others.',
					character: 'Darth Vader'
				},
				{
					text: 'Hang back and let the brunt of the fighting play out, intervening only when victory is assured.',
					character: 'Emperor Palpatine'
				},
				{
					text: 'Pick off high-value targets from the sidelines with precision.',
					character: 'Boba Fett'
				}
			]
		},
		{
			prompt: "What's your signature accessory or item?",
			answers: [
				{ text: 'A trusty lightsaber at my side.', character: 'Luke Skywalker' },
				{ text: 'My blaster – never leave home without it.', character: 'Han Solo' },
				{ text: 'A stylish cape that makes a statement.', character: 'Lando Calrissian' },
				{ text: 'Customized Mandalorian armor with all the gadgets.', character: 'Boba Fett' },
				{
					text: "An outfit that's elegant yet practical (and maybe a hidden blaster).",
					character: 'Princess Leia'
				},
				{
					text: 'A dark helmet and suit that command respect (and fear).',
					character: 'Darth Vader'
				}
			]
		}
	];

	// Quiz state variables
	let currentQuestionIndex = 0;
	let userAnswers = []; // stores the selected character for each question
	let quizFinished = false;
	let resultCharacter = '';

	// Function to record the user's answer for the current question
	function selectAnswer(character) {
		userAnswers[currentQuestionIndex] = character;
	}

	// Function to move to the next question or finish the quiz
	function nextQuestion() {
		if (typeof userAnswers[currentQuestionIndex] === 'undefined') {
			alert('Please select an answer before proceeding.');
			return;
		}
		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
		} else {
			calculateResult();
			quizFinished = true;
		}
	}

	// Function to tally the answers and determine the result character
	function calculateResult() {
		let frequency = {};
		for (const answer of userAnswers) {
			if (answer) {
				frequency[answer] = (frequency[answer] || 0) + 1;
			}
		}
		let max = 0;
		for (const character in frequency) {
			if (frequency[character] > max) {
				max = frequency[character];
				resultCharacter = character;
			}
		}
	}
</script>

{#if Particles}
	<Particles
		options={particlesOptions}
		class="pointer-events-none fixed inset-0"
		style="z-index: -10;"
	/>
{/if}

<slot />

<main class="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-white">
	<!-- Fixed header for the quiz title -->
	<header class="left-0 top-0 z-20 w-full py-4 shadow">
		<h1 class="text-center text-4xl font-bold">Which Original Trilogy Character Are You?</h1>
	</header>

	<!-- Quiz container with top margin to avoid the fixed header -->
	<div id="quiz-container" class="mt-20 w-full max-w-xl rounded-lg p-6 shadow-lg">
		{#if !quizFinished}
			<h2 class="mb-4 text-2xl font-bold">
				Question {currentQuestionIndex + 1} of {questions.length}
			</h2>
			<p class="mb-6">{questions[currentQuestionIndex].prompt}</p>
			<div class="space-y-4">
				{#each questions[currentQuestionIndex].answers as answer}
					<button
						on:click={() => selectAnswer(answer.character)}
						class="w-full rounded bg-blue-500 p-4 text-left hover:bg-blue-600"
						class:ring-2={userAnswers[currentQuestionIndex] === answer.character}
						class:ring-red-500={userAnswers[currentQuestionIndex] === answer.character}
					>
						{answer.text}
					</button>
				{/each}
			</div>
			<div class="mt-6 flex justify-end">
				<button
					on:click={nextQuestion}
					class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
				>
					Next
				</button>
			</div>
		{:else}
			<h2 class="mb-4 text-center text-3xl font-bold">Your Star Wars Character is:</h2>
			<p class="text-center text-2xl">{resultCharacter}</p>
		{/if}
	</div>
</main>
