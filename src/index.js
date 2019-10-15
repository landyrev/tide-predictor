import Harmonics from './harmonics/index'

class TidePrediction {
  constructor(harmonicConstituents) {
    this.harmonics = []
    this.isSubordinate = false
    this.harmonicConstituents = harmonicConstituents
    this.setHarmonicConstituents(harmonicConstituents)
  }

  setIsSubordinate(isSubordinate) {
    this.isSubordinate = isSubordinate
  }

  setHarmonicConstituents(constituents) {
    this.harmonics = new Harmonics(constituents)
  }

  setOffset(offset) {
    this.harmonics.setOffset(offset)
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {Date, unix timestamp} start
   * @param {Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.harmonics.setTimeSpan(start, end)
  }

  getTimelinePrediction() {
    if (!this.harmonics.timelineIsSet()) {
      throw new Error('Start and end times not set')
    }
    const prediction = this.harmonics.getPrediction()
    return prediction.getTimelinePrediction()
  }

  getExtremesPrediction() {
    if (!this.harmonics.timelineIsSet()) {
      throw new Error('Start and end times not set')
    }
    const prediction = this.harmonics.getPrediction()
    return prediction.getExtremesPrediction()
  }

  getWaterLevelAtTime(time) {
    const harmonic = new Harmonics(this.harmonicConstituents)
    const endDate = new Date(time.getTime() + 10 * 60 * 1000)
    harmonic.setTimeSpan(time, endDate)
    return harmonic.getPrediction().getTimelinePrediction()[0]
  }
}

export default TidePrediction
