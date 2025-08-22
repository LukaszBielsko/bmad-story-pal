# Epic 3: Personalization & User Experience

**Epic Goal:** Create the signature three-step personalization flow and child profile system that transforms generic stories into personalized adventures where children become the protagonists. This epic delivers the core differentiating user experience of StoryMagic.

## Story 3.1: Child Profile Creation

As a parent,
I want to create a profile for my child with key details,
so that stories can be personalized to make my child the main character.

### Acceptance Criteria

1. Child profile creation form with name, age, and basic preferences
2. Profile photo upload or avatar selection system
3. Interest tags selection (animals, sports, music, etc.)
4. Profile data validation and storage in PostgreSQL
5. Profile editing functionality for updating preferences
6. Profile deletion with confirmation dialog

## Story 3.2: Theme Selection Interface

As a parent,
I want to quickly choose a story theme that appeals to my child,
so that I can create relevant, engaging stories during our limited bedtime window.

### Acceptance Criteria

1. Visual theme grid with illustrated cards (120x120px as per design system)
2. Theme categories: Adventure, Animals, Princess/Prince, Space, Friendship, Magic
3. Theme selection with immediate visual feedback (selected state styling)
4. Age-appropriate theme filtering based on child's profile
5. Theme descriptions and sample story hooks for parent guidance
6. Smooth transitions between theme selection and next step

## Story 3.3: Three-Step Story Creation Flow

As a parent,
I want to create a personalized story in maximum three taps,
so that I can generate content quickly without cognitive strain during evening routines.

### Acceptance Criteria

1. Step 1: Child profile selection with visual profile cards
2. Step 2: Theme selection from categorized grid interface
3. Step 3: Simple personalization form (favorite color, pet, special detail)
4. Progress indicator showing current step (1 of 3, 2 of 3, 3 of 3)
5. Back navigation between steps without losing data
6. Generate story button with loading state and progress feedback

## Story 3.4: Personalization Form

As a parent,
I want to add simple details that make the story uniquely about my child,
so that the generated story feels personal and engaging.

### Acceptance Criteria

1. Simple form with 2-3 personalization fields (favorite color, pet name, hobby)
2. Optional field handling - stories generate even with minimal input
3. Input validation and character limits for story generation
4. Auto-suggestions based on common Polish children's preferences
5. Form submission with story generation API integration
6. Clear field labels and placeholders in Polish language

## Story 3.5: Story Generation Integration

As a child,
I want to see my name and details woven naturally into an exciting story,
so that I feel like the hero of my own adventure.

### Acceptance Criteria

1. Story generation request includes child profile and personalization data
2. Generated stories include child's name as protagonist
3. Personalization details (color, pet, etc.) integrated naturally into narrative
4. Age-appropriate story complexity based on child's profile age
5. Polish cultural references and familiar settings incorporated
6. Story quality validation before presenting to parent
