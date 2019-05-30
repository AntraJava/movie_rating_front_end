import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCommentBoardComponent } from './movie-comment-board.component';

describe('MovieCommentBoardComponent', () => {
  let component: MovieCommentBoardComponent;
  let fixture: ComponentFixture<MovieCommentBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCommentBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCommentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
