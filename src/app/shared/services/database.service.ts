import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './posts.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  loadedposts: Posts[] = [];
  url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = 'YOUR_REALTIME_DATABASE_URL';
  }

  addPost(inputTitle: string, inputContent: string) {
    const postData = {
      title: inputTitle,
      content: inputContent
    };

    this.http
      .post(this.url + this.authService.userUID + '/posts.json', postData)
        .subscribe(responseData => {
          console.log(responseData);
        });
  }

  fetchPost() {
     return this.http.get(this.url + this.authService.userUID + '/posts.json')
                      .pipe(
                        map((responseData) => {
                          console.log(responseData);
                          const responseArray: Posts[] = [];
                          for(const key in responseData) {
                            if(responseData.hasOwnProperty) {
                              responseArray.push({
                                title: responseData[key].title,
                                content: responseData[key].content,
                                id: key
                              });
                            }
                          }
                          this.loadedposts = responseArray;
                          return responseArray;
                        })
                      );
  }

  updatePost(updatedTitle: string, updatedContent: string, index: number) {
    const key = this.loadedposts[index].id;
    let updatedData: {title: string, content: string};
    if (updatedTitle === null && updatedContent === null) {
      console.log('No changes!');
    } else if(updatedTitle !== null && updatedContent !== null){
      updatedData = {
        title: updatedTitle,
        content: updatedContent
      };
    } else if(updatedContent === null) {
      updatedData = {
        title: updatedTitle,
        content: this.loadedposts[index].content
      };
    } else if(updatedTitle === null) {
      updatedData = {
        title: this.loadedposts[index].title,
        content: updatedContent
      };
    }
    this.http
        .put(this.url + this.authService.userUID + '/posts' + '/' + key + '.json', updatedData)
          .subscribe(responseData => {
            console.log(responseData);
          });
  }

  deletePost(index: number) {
    const key = this.loadedposts[index].id;
    this.http.delete(this.url + this.authService.userUID + '/posts' + '/' + key + '.json')
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}

