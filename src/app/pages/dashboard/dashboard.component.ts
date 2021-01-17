import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/app/shared/services/posts.model';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  postForm: FormGroup;
  updateForm: FormGroup;
  postsArray: Posts[] = [];
  editControl: Boolean = false;
  editPostNumber: number;

  constructor(public db: DatabaseService, public authService: AuthService) {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
    this.updateForm = new FormGroup({
      updatedTitle: new FormControl(null),
      updatedContent: new FormControl(null),
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.onDisplayPosts();
    }, 2000);
  }

  onPostSubmitted() {
    const inputTitle: string = this.postForm.get('title').value;
    const inputContent: string = this.postForm.get('content').value;
    this.db.addPost(inputTitle, inputContent);
    this.postForm.reset();
    setTimeout(() => {
      this.onDisplayPosts();
    }, 500);
  }

  onDisplayPosts() {
    this.db.fetchPost().subscribe((responseArray) => {
      this.postsArray = responseArray;
    });
  }

  onEditPressed(index: number) {
    this.editControl = !this.editControl;
    this.editPostNumber = index;
  }

  onDeletePressed(index: number) {
    this.db.deletePost(index);
    setTimeout(() => {
      this.onDisplayPosts();
    }, 1000);
  }

  onUpdatePressed(index: number) {
    const inputTitle: string = this.updateForm.get('updatedTitle').value;
    const inputContent: string = this.updateForm.get('updatedContent').value;
    this.db.updatePost(inputTitle, inputContent, index);
    this.updateForm.reset();
    this.editControl = !this.editControl;
    setTimeout(() => {
      this.onDisplayPosts();
    }, 1000);
  }
}
