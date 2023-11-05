describe("Attempt to Login Users", () => {
    before(() => {
        cy.GoToMathWorld('dev');
    })
  
    it("Student Login with Valid User Information", () => {
        cy.LoginUser('Student', 'student@gmail.com', 'student');
        cy.LogoutUser();
    })

    it("Student Login with Cap Mismatch", () => {
        cy.LoginUser('Student', 'Student@yahoo.com', 'Student');
        cy.CredentialsMsg('Invalid username or password')
    })

// Student email validation    
    it("Student Login with Invalid Email", () => {
        cy.LoginUser('Student', 'zrahem@yahoo.com', 'student');
        cy.CredentialsMsg('Invalid username or password')
    })

    it("Student Login with malformed Email (missing @)", () => {
        cy.LoginUser('Student', 'zyahoo.com', 'student');
        cy.ResponseMsg('Must be valid e-mail')
    })

    it("Student Login with malformed Email (missing domain)", () => {
        cy.LoginUser('Student', 'yraheem@yahoo', 'student');
        cy.ResponseMsg('Must be valid e-mail')
    })

    it("Student Login with blank Email (blank email)", () => {
        cy.LoginUser('Student', '', 'student');
        cy.ResponseMsg('Email is required')
    })

    it("Student Login with Invalid Email (short username)", () => {
        cy.LoginUser('Student', 'y@yahoo.com', 'student');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Student Login with Invalid Email (short domain)", () => {
        cy.LoginUser('Student', 'yshmael@y.com', 'student');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Student Login with malformed Email (missing '.')", () => {
        cy.LoginUser('Student', 'yshmael@ahoocom', 'student');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Student Login with malformed Email (missing 'com')", () => {
        cy.LoginUser('Student', 'yshmael@ahoo.', 'student');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Student Login with malformed Email (sql injection)", () => {
        cy.LoginUser('Student', 'select * from;', 'student');
        cy.ResponseMsg('Invalid username or password');
    })    
    // Student password validation
    it("Student Login with blank password (blank password)", () => {
        cy.LoginUser('Student', 'student@gmail.com', '');
        cy.ResponseMsg('Password is required')
    })

    it("Student Login with short password (< 8 char password)", () => {
        cy.LoginUser('Student', 'student@gmail.com', 'd#swdR7');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (no special char)", () => {        
        cy.LoginUser('Student', 'student@gmail.com', 'dswdR7diekdC');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (no number)", () => {
        cy.LoginUser('Student', 'student@gmail.com', 'dswdR@diekdC');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (no capital letter)", () => {        
        cy.LoginUser('Student', 'student@gmail.com', 'dswdd@diekdt4');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (no small letter)", () => {
        cy.LoginUser('Student', 'student@gmail.com', 'DADE@738DADTESH');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (All letters)", () => {
        cy.LoginUser('Student', 'student@gmail.com', 'DaDdEeFfGgHh');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (All special chars)", () => {
        cy.LoginUser('Student', 'student@gmail.com', '!@#$%^&*()_+~`|}{[]\:;?><,./-=');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (All numbers)", () => {
        cy.LoginUser('Student', 'student@gmail.com', '1234567891011121314151617181920');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (All blank char)", () => {
        cy.LoginUser('Student', 'student@gmail.com', '         ');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Student Login with invalid password (All lower chars)", () => {
        cy.LoginUser('Student', 'student@gmail.com', 'eisojfoijsdfoij');;
        cy.ResponseMsg('Invalid username or password')
    })
        
    // Teacher Login
    it("Teacher Login with Valid User Information", () => {
        cy.LoginUser('Teacher', 'teacher@gmail.com', 'teacher');
        cy.LogoutUser();
    })

// Teacher email validation
    it("Teacher Login with Invalid Cap", () => {
        cy.LoginUser('Teacher', 'Teacher@yahoo.com', 'Teacher');
        cy.CredentialsMsg('Invalid username or password')
    })

    it("Teacher Login with Invalid Email", () => {
        cy.LoginUser('Teacher', 'Teacher@yahoo.com', 'Teacher');
        cy.CredentialsMsg('Invalid username or password')
    })

    it("Teacher Login with malformed Email (missing @)", () => {
        cy.LoginUser('Teacher', 'zgmail.com', 'Teacher');
        cy.ResponseMsg('Must be valid e-mail')
    })

    it("Teacher Login with malformed Email (missing domain)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail', 'Teacher');
        cy.ResponseMsg('Must be valid e-mail')
    })

    it("Teacher Login with blank Email (blank email)", () => {
        cy.LoginUser('Teacher', '', 'Teacher');
        cy.ResponseMsg('Email is required')
    })

    it("Teacher Login with Invalid Email (short username)", () => {
        cy.LoginUser('Teacher', 'y@gmail.com', 'Teacher');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Teacher Login with Invalid Email (short domain)", () => {
        cy.LoginUser('Teacher', 'Teacher@g.com', 'Teacher');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Teacher Login with malformed Email (missing '.')", () => {
        cy.LoginUser('Teacher', 'Teacher@gmailcom', 'Teacher');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Teacher Login with malformed Email (missing 'com')", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.', 'Teacher');
        cy.ResponseMsg('Invalid username or password');
    })

    it("Teacher Login with malformed Email (sql injection)", () => {
        cy.LoginUser('Teacher', 'select * from;', 'Teacher');
        cy.ResponseMsg('Invalid username or password');
    })    
    // Teacher password validation
    it("Teacher Login with blank password (blank password)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', '');
        cy.ResponseMsg('Password is required')
    })

    it("Teacher Login with short password (< 8 char password)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'd#swdR7');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (no special char)", () => {        
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'dswdR7diekdC');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (no number)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'dswdR@diekdC');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (no capital letter)", () => {        
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'dswdd@diekdt4');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (no small letter)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'DADE@738DADTESH');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (All letters)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'DaDdEeFfGgHh');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (All special chars)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', '!@#$%^&*()_+~`|}{[]\:;?><,./-=');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (All numbers)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', '1234567891011121314151617181920');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (All blank char)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', '         ');
        cy.ResponseMsg('Invalid username or password')
    })

    it("Teacher Login with invalid password (All lower chars)", () => {
        cy.LoginUser('Teacher', 'Teacher@gmail.com', 'eisojfoijsdfoij');;
        cy.ResponseMsg('Invalid username or password')
    })
    // Teacher with Student Login
    it("Teacher Login with student credentials", () => {
        cy.LoginUser('Teacher', 'Student@gmail.com', 'Student');;
        cy.ResponseMsg('Invalid username or password')
    })
    // Student with Teacher credentials
    it("Student Login with teacher credentials", () => {
        cy.LoginUser('Student', 'Teacher@gmail.com', 'Teacher');;
        cy.ResponseMsg('Invalid username or password')
    })

})