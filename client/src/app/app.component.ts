import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Real Time Messaging';
  messages
  constructor(private webSocketService: WebSocketService){

  }
  ngOnInit(){
    //connect to socket.io server
    this.webSocketService.listen('messages').subscribe((data:any[]) => {
      this.messages = data
    })
  }
}
