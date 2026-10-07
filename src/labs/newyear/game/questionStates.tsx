import { QuestionView } from './screens'
import { Q_MATCH, Q_ONE_IMAGE, Q_OPEN, Q_TWO_IMAGES } from './data'

export const Q1Match = () => <QuestionView q={Q_MATCH} kind="match" />
export const Q2OneImage = () => <QuestionView q={Q_ONE_IMAGE} kind="image1" />
export const Q3TwoImages = () => <QuestionView q={Q_TWO_IMAGES} kind="image2" />
export const Q4Open = () => <QuestionView q={Q_OPEN} kind="open" />
