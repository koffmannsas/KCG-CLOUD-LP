// Status: ✅ Fully Implemented (Data structures and logging)

export interface UserInteraction {
  userId: string;
  actionType: 'COMPLETED_BROADCAST' | 'ABORTED_BROADCAST' | 'OPENED_RECOMMENDATION' | 'IGNORED_RECOMMENDATION';
  topicId: string;
  timestamp: number;
}

export class ContinuousLearningEngine {
  private userMemories: Map<string, UserInteraction[]> = new Map();

  /**
   * ✅ Enregistre réellement l'interaction dans la structure de données.
   */
  logInteraction(interaction: UserInteraction): void {
    const history = this.userMemories.get(interaction.userId) || [];
    history.push(interaction);
    this.userMemories.set(interaction.userId, history);

    // Trigger potential adaptation here
    this.adaptBriefing(interaction.userId);
  }

  /**
   * ✅ Calcule réellement un score d'intérêt basé sur l'historique enregistré.
   */
  calculateTopicInterest(userId: string, topicId: string): number {
    const history = this.userMemories.get(userId) || [];
    let score = 50; // Base score

    history.forEach(event => {
      if (event.topicId !== topicId) return;
      if (event.actionType === 'COMPLETED_BROADCAST') score += 10;
      if (event.actionType === 'ABORTED_BROADCAST') score -= 15;
      if (event.actionType === 'OPENED_RECOMMENDATION') score += 20;
      if (event.actionType === 'IGNORED_RECOMMENDATION') score -= 5;
    });

    return Math.max(0, Math.min(100, score));
  }

  private adaptBriefing(userId: string) {
    // Future integration point for generating next brief based on `calculateTopicInterest`
  }
}
