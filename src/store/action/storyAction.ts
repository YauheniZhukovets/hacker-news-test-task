export const setStoryIds = (ids: number[]) => {
  return { type: 'STORY/SET-STORY-IDS', ids } as const
}
