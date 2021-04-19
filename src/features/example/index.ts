import type { FeatureModule, QuestionAnswers } from '../../types'

async function setup(answer: QuestionAnswers) {
  console.log(answer.anc)
  return {}
}

const exampleFeature: FeatureModule = {
  questionsBuilder() {
    return []
  },
  setup
}

export default exampleFeature
