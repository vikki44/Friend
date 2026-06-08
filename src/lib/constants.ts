export const PASSWORD = 'oursecret'

export const letterLines: string[] = [
  'Happy Best Friend Day🐧.',
  'I never imagined that one person could become such an important part of my life 😭.',
  'I\'m so grateful for you and all the memories we\'ve made together.',
  'Some people enter our lives and leave quietly',
  'But you stayed even tho I\'m not deserving at all.',
  'I\'m Trying to be a good guy and deserving of you and I\'ll succeed very soon.',
  'Through laughter, random conversations, silly moments, and difficult days.',
  'You became one of my favorite chapter of my life.',
  'Thank you for every memory.',
  'Thank you for being you.',
  'Love you always ❤️',
]

export type GalleryItem = {
  id: string
  src: string
  title: string
  accent?: string
}

export const galleryItems: GalleryItem[] = [
  { id: 'memory-1', src: '/images/photo.png', title: 'FreeFire', accent: 'rose' },
  { id: 'memory-2', src: '/images/photo-2.png', title: 'The Memories which ill never forget', accent: 'lavender' },
  { id: 'memory-3', src: '/images/photo-3.png', title: 'Everytime i think of you i smile.', accent: 'ice' },
  { id: 'memory-4', src: '/images/photo-4.png', title: 'One of the best days of my life is with you.', accent: 'rose' },
  { id: 'memory-5', src: '/images/photo-5.png', title: 'You are My favorite person and you will be my favoraite.', accent: 'lavender' },
]
