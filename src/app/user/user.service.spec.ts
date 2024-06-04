import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the server', () => {
    const usersMock: User[] = [{ id: 1, name: 'avraham', address: 'Amit Meir 10', email: 'gyui@gmail.com', password: '245w6du' }];
    service.getUsers().subscribe((users: User[]) => {
      expect(users).toEqual(usersMock);
    });

    const req = httpTestingController.expectOne(service.baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(usersMock);
  });

  it('should retrieve a user by ID from the server', () => {
    const userId = 1;
    const userMock: User = { id: userId, name: 'John Doe', address: '', email: '', password: '' };
    service.getUserById(userId).subscribe((user: User) => {
      expect(user).toEqual(userMock);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/${userId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(userMock);
  });

  it('should save a user to the server', () => {
    const userToSave: User = { id: 2, name: 'Jane Doe', address: 'Amit Meir 10', email: 'gyui@gmail.com', password: '245w6du' };
    const savedUserMock: User = { id: 1, name: 'Jane Doe', address: 'Amit Meir 10', email: 'gyui@gmail.com', password: '245w6du' };
    service.saveUserToServer(userToSave).subscribe((response: User[]) => {
      expect(response[0]).toEqual(savedUserMock);
    });

    const req = httpTestingController.expectOne(service.baseUrl);
    expect(req.request.method).toEqual('POST');
    req.flush([savedUserMock]);
  });

  // Add more tests for updateUserOnServer, deleteUserFromServer, and handleError as needed
});