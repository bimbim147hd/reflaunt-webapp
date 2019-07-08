import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Router, NavigationEnd } from '@angular/router';
import {
  FETCH_MESSAGES_REQUESTED,
  SELECTED_MESSAGES_REQUESTED,
  POST_MESSAGE_REQUESTED
} from './queries.actions';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Queries';
  constructor(private router: Router) {
    super();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_MESSAGES_REQUESTED });
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  chooseMessage(val) {
    this.store.dispatch({ type: SELECTED_MESSAGES_REQUESTED, data: val });
  }

  postMessage() {
    this.store.dispatch({
      type: POST_MESSAGE_REQUESTED,
      data: this.payload.messageSelected,
      messageText: this.payload.replyMessage
    });
  }

  mapStateToProps(state) {
    return {
      payload: state.Queries
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
