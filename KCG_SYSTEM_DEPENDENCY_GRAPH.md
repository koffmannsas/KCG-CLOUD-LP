# KCG SYSTEM DEPENDENCY GRAPH

## Audit des Moteurs Existants (Phase 1)
L'objectif est d'éliminer le couplage direct entre les moteurs.

1. **AI Router & Cost Optimizer**
   - *Dépendances :* Appelé par Orchestrator
   - *Événements émis :* `AiModelSelected`, `CostMetricsUpdated`
2. **Quality Engine**
   - *Dépendances :* Appelé après chaque génération de texte
   - *Événements émis :* `QualityScoreGenerated`
3. **Observability Engine**
   - *Dépendances :* Écoute passive de tous les événements
4. **Predictive Intelligence & Memory Learning**
   - *Dépendances :* Exécution asynchrone sur détection de `UserInteraction`

*Le système évolue d'un graphe spaghetti vers un modèle Event-Driven centré autour de l'Executive Orchestrator.*
