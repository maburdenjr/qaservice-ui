import React, { Component } from 'react';
import RadioButton from '../components/RadioButton';
import Error from '../components/Error';
import CheckBox from '../components/CheckBox';

class QuestionBody extends Component {
    constructor(props) {
        super(props);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.renderSkipCallout = this.renderSkipCallout.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.clearAnswersAndSubmit = this.clearAnswersAndSubmit.bind(this);
        this.state = {
           disabled: true,
           submitted: false
        };
    }

    //<-- Life Cycle Methods -->
    componentDidUpdate(){
      this.removePriorCallout();
      this.renderSkipCallout();
    }

    componentWillReceiveProps(){
        this.disableButton(true);
        this.setState({submitted: false});
    }


    getFormComponent(maxAnswers) {
        if (maxAnswers > 1) {
            return CheckBox;
        } else if (maxAnswers == 1) {
            return RadioButton;
        } else {
            return Error;
        }
    }

    disableButton(bool){
      this.setState({disabled: bool});
    }

    clearAnswersAndSubmit(){
      this.setState({submitted: true});
      this.props.submitAnswers();
    }

    removePriorCallout(){
      var jQuery = window.jQuery;
      jQuery('#skipCallout').callout('close');
    }

    renderSkipCallout(){
      var jQuery = window.jQuery;
      jQuery('#skipCallout').callout({
        'content': '#skipCalloutContent',
        'type': 'hover',
        'position': 'top'
      });
    }

    render() {
        if(this.props.question.validationRule) {
            let FormComponent = this.getFormComponent(this.props.question.validationRule.maxAnswers);
            let skipQuestion = this.props.skipQuestion;
            let removePriorCallout = this.removePriorCallout;
            return (
                <div id="questionBody" className="ancCol w100">
                    <div id="acisQuestionHeader">
                        <h1 className="conTitle">{this.props.question.label}</h1>
                        {(() => {
                            if (this.props.question.instruction) {
                                return (
                                    <h3>{this.props.question.instruction}</h3>
                                );
                            }
                        })()}
                    </div>
                    <form id="acisQuestionForm" className="form">
                        <FormComponent options={this.props.question.options} updateAnswers={this.props.updateAnswers} validationRule={this.props.question.validationRule} disableButton={ this.disableButton } submitted={this.state.submitted}></FormComponent>
                        <div className="formFooter centered">
                            <button type="button" className="ancBtn" id="submitQuestion" disabled={ this.state.disabled } onClick={ this.clearAnswersAndSubmit }>Submit</button>
                            <button className="link calloutTriggerNoArrow" type="button" id="skipCallout" >Skip</button>
                              <div id="skipCalloutContent" className="calloutDomContent">
                                <a onClick={() => removePriorCallout()}></a>
                                <p>Why are you skipping?</p>
                                <ul onClick ={(event) => skipQuestion(event.target.id) }>
                                  <li><a id={'1'} >Unsure of answer</a></li>
                                  <li><a id={'2'} >Don't understand question</a></li>
                                  <li><a id={'3'} >Sensitive information</a></li>
                                  <li><a id={'4'} >None of the above</a></li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return null;
        }
    }

}

export default QuestionBody;
