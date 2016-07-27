import React, { Component } from 'react';
import CircleDesign from './CircleDesign.jsx';
import CardDesign from './CardDesign.jsx';


class RadioButton extends Component {

    constructor(props) {
        super(props);
        this.toggleChecked = this.toggleChecked.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.state = {
          selectedAnswer: null
        };
    }

    //<-- Life Cycle Methods -->
    componentWillReceiveProps(){
      if(this.props.submitted){
        this.setState({selectedAnswer: null});
      }
    }


    toggleChecked(selectedId){
      this.setState({selectedAnswer: selectedId});
      this.props.disableButton(false);
      this.props.updateAnswers(selectedId);
    }

    getGridLayout(options) {
        let optionCount = options.length;
        switch(optionCount) {
            case 2:
                return 'ancCol w50';
            case 3:
                return 'ancCol w33 full480';
            default:
                return 'ancCol w20 half320 third480';
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
        let toggleChecked = this.toggleChecked;
        let DisplayType = this.calculateDisplayType(this.props.options);
        let selectedAnswer = this.state.selectedAnswer;
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
                                    <input id={'option-'+result.id} name="questionInput" type="radio" checked={ selectedAnswer === result.id} className="radio" defaultValue={result.id} onClick={() => toggleChecked(result.id)} />
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

export default RadioButton;
