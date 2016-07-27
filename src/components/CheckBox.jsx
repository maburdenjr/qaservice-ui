import React, { Component } from 'react';
import CircleDesign from './CircleDesign.jsx';
import CardDesign from './CardDesign.jsx';

class CheckBox extends Component {
  constructor(props) {
      super(props);
      this.checkBoxTracker = this.checkBoxTracker.bind(this);
      this.checkBoxHighlighter = this.checkBoxHighlighter.bind(this);
      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
      this.state = {
        selectedAnswers: []
      };
    }

  //<-- Life Cycle Methods -->
  componentWillReceiveProps(){
    if(this.props.submitted){
      this.setState({selectedAnswers: []});
    }
  }


  getGridLayout(options) {
    var optionCount = options.length;
    switch(optionCount) {
        case 2:
            return 'ancCol w50';
        case 3:
            return 'ancCol w33 full480';
        default:
            return 'ancCol w20 half320 third480';
    }
  }

  checkAnswersLength(answers){
    this.props.disableButton((answers.length === 0));
  }

  checkBoxHighlighter(selectedId){
    return this.state.selectedAnswers.indexOf(selectedId) > -1;
  }

  checkBoxTracker(e, answerId, maxAnswers){
    let currentAnswers = this.state.selectedAnswers;
    let answerIdx = currentAnswers.indexOf(answerId);
    if(currentAnswers.length >= maxAnswers && answerIdx < 0){
      e.preventDefault();
    } else {
      if(answerIdx < 0){
        //setState callbacks used to prevent race condition, lets state update first
        this.setState({ selectedAnswers: currentAnswers.concat([answerId])}, () => {
          this.props.updateAnswers(this.state.selectedAnswers);
          this.checkAnswersLength(this.state.selectedAnswers);
        });
      } else {
        let idxOfAnswerToRemove = currentAnswers.indexOf(answerId);
        let newAnswersArr = currentAnswers.slice(0, idxOfAnswerToRemove).concat(currentAnswers.slice(idxOfAnswerToRemove + 1));
        this.setState({selectedAnswers: newAnswersArr}, () => {
          this.props.updateAnswers(this.state.selectedAnswers);
          this.checkAnswersLength(this.state.selectedAnswers);
        });
      }
    }
  }

  calculateDisplayType(options) {
    for (var key in options) {
        if (!options.hasOwnProperty(key)) continue;
        var obj = options[key];
        if(obj.label.length > 27 || obj.instruction) {
            return CardDesign;
        }
    }
    return CircleDesign;
  }


  render() {
      let gridClass = this.getGridLayout(this.props.options);
      let checkBoxTracker = this.checkBoxTracker;
      let maxAnswers = this.props.validationRule.maxAnswers;
      let checkBoxHighlighter = this.checkBoxHighlighter;
      let DisplayType = this.calculateDisplayType(this.props.options);
      if (DisplayType === CardDesign) {
          gridClass = 'ancCol w50 full320';
      }

      if(this.props.options) {
          return (
              <fieldset className="ancGrid ancGridPadded">
                  {
                      this.props.options.map(function (result) {
                          return (
                              <div key={result.id} className={gridClass}>
                                  <label htmlFor={'option-'+result.id}>
                                  <input id={'option-'+result.id} name="myCollection[]" type="checkbox" checked={ checkBoxHighlighter(result.id) } className="checkbox" defaultValue={result.id} onClick={(event) => checkBoxTracker(event, result.id, maxAnswers)}  />
                                  <DisplayType option={result} />
                                  </label>
                              </div>
                          );
                      })
                  }
              </fieldset>
          );
      } else {
          return null;
      }
  }

}

export default CheckBox;
