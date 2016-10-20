import React from 'react';

export default class CalendarEventPopover extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
  }

  extractNotesFromDescription(node) {
    const els = node.querySelectorAll('meta[itemprop=description]');
    let notes = null;
    if (els.length) {
      notes = Array.from(els).map(el => el.content).join('\n');
    } else {
      notes = node.innerText;
    }
    while (true) {
      const nextNotes = notes.replace('\n\n', '\n');
      if (nextNotes === notes) {
        break;
      }
      notes = nextNotes;
    }
    return notes;
  }

  render() {
    const {title, description, when, location, owner} = this.props.event;

    const fragment = document.createDocumentFragment();
    const descriptionRoot = document.createElement('root')
    fragment.appendChild(descriptionRoot)
    descriptionRoot.innerHTML = description;

    const notes = this.extractNotesFromDescription(descriptionRoot);

    return (
      <div className="calendar-event-popover" tabIndex="0">
        <div className="title">
          {title}
        </div>
        <div className="location">
          {location}
        </div>
        <div className="section">
          <div className="description">
            <div className="label">Notes: </div>
            { notes }
          </div>
        </div>
      </div>
    );
  }
}
