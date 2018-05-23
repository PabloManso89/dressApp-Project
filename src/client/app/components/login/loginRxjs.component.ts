// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/Observable/fromEvent'
//
// import { UsersService } from './../../services/users.service'
// import {User} from "../../models/User";
//
// @Component({
//   selector: 'app-login-rxjs',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//
//   private source;
//
//   constructor() {
//     this.source = Observable.fromEvent(document, 'click');
//   }
//
//   ngOnInit() {
//     this.source.flatMap(e => this.loadWithFetch('../../assets/users.json'))
//       .subscribe(
//         this.outputUsers,
//         error => console.log(`value ${error}`),
//         () => console.log('complete')
//     );
//
//     this.loadWithFetch('../../assets/users.json')
//
//     // this.source.map(e => this.load('../../assets/users.json'))
//     // .subscribe(o => { console.log(o); });
//   }
//   private load(url: string) {
//     return Observable.create(observer => {
//         const xhr = new XMLHttpRequest();
//         xhr.addEventListener('load', () => {
//           if (xhr.status !== 200) {
//             return observer.error(xhr.statusText);
//           }
//           const users = JSON.parse(xhr.responseText);
//           observer.next(users); // It will execute the subscribed funtcion (outputUsers) for each result
//           observer.complete();
//         });
//         xhr.open('GET', url);
//         xhr.send();
//       }
//     ).retryWhen(this.retryStrategy({attempts: 2, delay: 1000}));
//   }
//   private loadWithFetch(url: string): Observable<any> {
//     return Observable.defer(() => {
//       return Observable.fromPromise(fetch(url).then(r => r.json()));
//     });
//   }
//   private retryStrategy({attempts = 1, delay = 1000}) {
//     return function(errors) {
//       return errors
//         .scan((accumulator, value) => {
//           console.log(accumulator, value);
//           return accumulator + 1;
//         }, 0) // the initial counter
//         .takeWhile(accumulator => accumulator < attempts)
//         .delay(delay);
//     }
//   }
//
//   outputUsers(users) {
//     users.forEach( m => {
//         console.log(m);
//       }
//     );
//   }
//
// }
