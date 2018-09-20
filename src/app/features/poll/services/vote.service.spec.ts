import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';

import { VoteService } from './vote.service';

import { vote } from '../../../test-helpers';

describe('VoteService', () => {
  let service: VoteService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoteService,
        { provide: AngularFirestore, useValue: vote.firestore.angularFirestoreStub }]
    });

    service = TestBed.get(VoteService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "vote"', () => {
    expect(afs.collection).toHaveBeenCalledWith('vote');
  });

  describe('trackVote', () => {
    afterEach(() => {
      while (vote.firestore.testVoteItems.length > 0) {
        vote.firestore.testVoteItems.pop();
      }
    });

    it('Should call vote collection with user id', () => {
      fail();
    });

    it('Should call document collection with "votes"', () => {
      fail();
    });

    it('Should return empty list when no data', () => {
      fail();
    });

    it('Should return correct data', () => {
      fail();
    });
  });

  describe('getVotesForUser', () => {
    it('Should call vote collection with user id', () => {
      fail();
    });

    it('Should return correct data', () => {
      fail();
    });
  });
});
