// IF NEEDED PLEASE DO NOT FORGET TO UPDATE THE url IN SUPPORT\COMMANDS.JS TO EITHER
// - dev_url80
// - dev_url81
// if the Should Register type is student, then the contact person is displayed
// AndNewAccount('first name','middle name','last name','Student/Teacher','School', 'email', 'password')
// AndContactPerson(cpFName, cpMiddleName, cpLName, cpRelation, cpCountry, cpState, cpCity, cpStreet, cpZip, cpPhone)
// Task: Create Unit Test
// Ysh Test # 03 - 13  
// Chatan with Ysh  Test # 14 - 24
// Arnold Test # 25 - 35
// Marvin Test # 36 - 46
// Mike Test # 47 - 57
// Holliday Test # 58 - 68
// Ysh Test # 69 - 79
describe("Attempt to Should Register Users", () => {
    before(() => {        
        cy.GoToMathWorld('dev');          
    })

// (001) Valid Student Information
    it("Should Register Student with Valid User and Contact Information", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.ResponseMsg('Account successfully Should Registered');
    })

// (002) Blank first name (Required Field)
    it("Should Not Register Student with Blank First Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('blank', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.ResponseMsg('First name is required');
    })

// (003) Blank middle name (Optional Field)
    it("Should Register Student with Blank Middle Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', 'blank', '', 'Student', '', '', '');
        cy.AddContactPerson('','blank','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Account successfully registered');  
        cy.contains('Click here to sign in')     
    })

// (004) Blank last name (Required Field)
    it("Should Not Register Student with Blank Last Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', 'blank', 'Student', '', '', '');
        cy.AddContactPerson('','blank','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Last name is required');          
    })
  
// (005) Blank email (Required Field)
    it("Should Not Register Student with Blank Email", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', 'blank', '');
        cy.AddContactPerson('','blank','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('E-mail is required');          
    })

// (006) Blank password (Required Field)
    it("Should Not Register Student with Blank Password", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', 'blank');
        cy.AddContactPerson('','blank','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Password is required'); 
    })

// Contact Person Information
// (007) Blank first name (Required Field)
    it("Should Not Register Student with Blank Contact First Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('blank','','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
       // cy.contains('First name is required'); 
    })

// (009) Blank middle name (Optional Field) 
    it("Should Register Student with Blank Contact Middle Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','blank','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Account successfully registered'); 
        cy.contains('Click here to sign in'); 
    })

// (010) Blank last name (Required Field)
    it("Should Not Register Student with Blank Contact Last Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','blank','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Last name is required');         
    })

// (011) Blank relationship (Required Field)
    it("Should Not Register Student with Blank Contact Relationship", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','blank','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Relationship is required');         
    })

// (012) Country (Required Field)
    it("Should Not Register Student with Blank Contact Country", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','blank', 'blank', 'blank', '', '', '');
        cy.CreateAccount();
        cy.contains('Country is required');
        cy.contains('State is required');
        cy.contains('City is required');
    })
    
// (013) Phone Number (Required Field)
    it("Should Not Register Student with Blank Contact Phone Number", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', 'blank');
        cy.CreateAccount();
        cy.contains('Phone must be 10 numbers long');
    })
    
// (014) Street Address (Required Field)
    it("Should Not Register Student with Blank Contact Street Address", () => {
    })

// (015) City (Required Field)
    it("Should Not Register Student with Blank Contact City", () => {
    })

// (016) State (Required Field)
    it("Should Not Register Student with Blank Contact State", () => {
    })

// (017) Zip Code (Required Field)
    it("Should Not Register Student with Blank Contact Zip Code", () => {
    })

// (018) Invalid Email (Required Field)
it("Should Not Register Student with Invalid Email", () => {

    cy.CreateRegisterDataSet();
cy.AddNewAccount('', '', '', 'Student', '', 'yraheem@yahoo', '');
cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', 'Coit Rd', '', '');
cy.CreateAccount();
// cy.contains('Must be valid e-mail'); 

})

// (019) Invalid Password (Required Field)
it("Should Not Register Student with Invalid Password", () => {

   //3-	It is allowing me with 2 char password like 12 …
    // There is a bug- TC – 19 – even 1 letter password is being taken so what is an invalid password
})

// (020) Invalid Phone Number
it("Should Register Student with Invalid Phone Number", () => {
   //4-	It is allowing me a single digit 5 digit phone number etc  - TC-20 – 
   // So what is invalid phone number ? – It is not allowing me alphabets anyway
})

// (021) Invalid Zip Code
it("Should Register Student with Invalid Zip Code", () => {
    cy.CreateRegisterDataSet();
    cy.AddNewAccount('', '', '', 'Student', '', '', '');
    cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', 'Coit Rd', '88888', '');
    cy.CreateAccount();
    // cy.contains('ZIP code must be 5 or 9 characters long'); 
})

// (022) Minimum Password Length (Required Field)
it("Should Register Student with Minimum Password Length", () => {
   cy.CreateRegisterDataSet();        
   cy.AddNewAccount('', '', '', 'Student', '', '', '1');
   cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '1');
   cy.CreateAccount();
   cy.ResponseMsg('Account successfully Should Registered');
})
})

// (023) Maximum Password Length (Required Field)
it("Should Register Student with Maximum Password Length", () => {
   cy.CreateRegisterDataSet();        
   cy.AddNewAccount('', '', '', 'Student', '', '', '1234567890123456789012345');
   cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '');
   cy.CreateAccount();
   cy.ResponseMsg('Account successfully Should Registered');
})

// (024) Minimum Phone Number Length
it("Should Register Student with Minimum Phone Number Length", () => {
     cy.CreateRegisterDataSet();        
   cy.AddNewAccount('', '', '', 'Student', '', '', '1');
   cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '1');
   cy.CreateAccount();
   cy.ResponseMsg('Account successfully Should Registered');
})

// (025) Maximum Phone Number Length
it("Should Register Student with Maximum Phone Number Length", () => {
   cy.CreateRegisterDataSet();        
   cy.AddNewAccount('', '', '', 'Student', '', '', '1');
   cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '1234567890');
   cy.CreateAccount();
   cy.ResponseMsg('Account successfully Should Registered');
})

// (026) Minimum Zip Code Length
    it("Should Register Student with Minimum Zip Code Length", () => {
    })

// (027) Maximum Zip Code Length
    it("Should Register Student with Maximum Zip Code Length", () => {
    })

// (028) Minimum First Name Length
    it("Should Register Student with Minimum First Name Length", () => {
    })

// (029) Maximum First Name Length  
    it("Should Register Student with Maximum First Name Length", () => {
    })

// (030) Minimum Middle Name Length 
    it("Should Register Student with Minimum Middle Name Length", () => {
    })

// (031) Maximum Middle Name Length
    it("Should Register Student with Maximum Middle Name Length", () => {
    })

// (032) Exceed Minimum Last Name Length
    it("Should Not Register Student with Exceeded Minimum Last Name Length", () => {
    })

// (033) Minimum School Lenth
    it("Should Register Student with Minimum School Length", () => {
    })

// (034) Maximum School Length
    it("Should Register Student with Maximum School Length", () => {
    })
// (035) Exceed Maximum School Length 
    it("Should Not Register Student with Exceeded Maximum School Length", () => {
    })

// (036) Minimum email length
    it("Should Register Student with Minimum Email Length", () => {
    })

// (037) Maximum email length
    it("Should Register Student with Maximum Email Length", () => {
    })

// (038) Exceed Maximum email length
    it("Should Not Register Student with Exceeded Maximum Email Length", () => {
    })

// (039) Minimum Password Length
    it("Should Register Student with Minimum Password Length", () => {
    })

// (040) Maximum Password Length
    it("Should Register Student with Maximum Password Length", () => {
    })

// (041) Exceed Maximum Password Length
    it("Should Not Register Student with Exceeded Maximum Password Length", () => {
    })

// (042) Minimum Contact First Name Length
    it("Should Register Student with Minimum Contact First Name Length", () => {
    })

// (043) Maximum Contact First Name Length
    it("Should Register Student with Maximum Contact First Name Length", () => {
    })

// (044) Exceed Maximum Contact First Name Length
    it("Should Not Register Student with Exceeded Maximum Contact First Name Length", () => {
    })

// (045) Minimum Contact Middle Name Length
    it("Should Register Student with Minimum Contact Middle Name Length", () => {
    })

// (046) Maximum Contact Middle Name Length
    it("Should Register Student with Maximum Contact Middle Name Length", () => {
    })

// (047) Exceed Maximum Contact Middle Name Length
    it("Should Not Register Student with Exceeded Maximum Contact Middle Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','ThisIsJustATestToSeeIfErrorMessageAppears','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Middle name must be 25 characters long');
    })

// (048) Minimum Contact Last Name Length
    it("Should Register Student with Minimum Contact Last Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','a','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount();
        cy.contains('Account successfully registered Click here to sign in');
    })

// (049) Maximum Contact Last Name Length
    it("Should Register Student with Maximum Contact Last Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','HelloThisIsLastNameTesttt','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount(); 
        cy.contains('Account successfully registered Click here to sign in');
    })

// (050) Exceed Maximum Contact Last Name Length
    it("Should Not Register Student with Exceeded Maximum Contact Last Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','HelloThisIsLastNameTestttt','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount(); 
        cy.contains('Last name must be 25 characters long');
    })

// (051) Minimum Contact Street Address Length
    it("Should Register Student with Minimum Contact Street Address Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Alaska', 'Y', '', '', '');
        cy.CreateAccount(); 
        cy.contains('Account successfully registered Click here to sign in');
    })

// (052) Maximum Contact Street Address Length
    it("Should Register Student with Maximum Contact Street Address Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '4343 ThisIsJustATest ave.', '', '');
        cy.CreateAccount(); 
        cy.contains('Account successfully registered Click here to sign in');
    })

// (053) Exceed Maximum Contact Street Address Length
    it("Should Not Register Student with Exceeded Maximum Contact Street Address Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '43434 ThisIsJustATest ave.', '', '');
        cy.CreateAccount(); 
        cy.contains('Street must be 25 characters long');
    })

// (054) Minimum Phone Number Length
    it("Should Register Student with Minimum Phone Number Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '5557463212');
        cy.CreateAccount(); 
        cy.contains('Account successfully registered Click here to sign in');
    })
    

// (055) Maximum Phone Number Length
    it("Should Register Student with Maximum Phone Number Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '5557463212');
        cy.CreateAccount(); 
        cy.contains('Account successfully registered Click here to sign in');
    })

// (056) Exceed Maximum Phone Number Length 
    it("Should Not Register Student with Exceeded Maximum Phone Number Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '55549382939304044');
        cy.CreateAccount(); 
        cy.contains('Phone must be 10 numbers long');
    })

// (057) Minimum Zip Code Length
    it("Should Register Student with Minimum Zip Code Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Student', '', '', '');
        cy.AddContactPerson('','','','','United States', 'Arkansas', 'Alma', '', '', '');
        cy.CreateAccount(); 
        cy.contains('Account successfully registered Click here to sign in');
    })

// (058) Maximum Zip Code Length
    it("Should Register Student with Maximum Zip Code Length", () => {
    })

// (059) Exceed Maximum Zip Code Length
    it("Should Not Register Student with Exceeded Maximum Zip Code Length", () => {
    })

// (060) Alphanumeric Zip Code
    it("Should Not Register Student with Alphanumeric Zip Code", () => {
    })

// (061) Password with Special Characters only
    it("Should Not Register Student with Password with Special Characters", () => {
    })

// (062) Password with Numbers only
    it("Should Not Register Student with Password with Numbers only", () => {
    })

// (063) Password with Letters only
    it("Should Not Register Student with Password with Letters only", () => {
    })

// (064) Password with Letters and Numbers only
    it("Should Not Register Student with Password with Letters and Numbers only", () => {
    })

// (065) Password with Letters and Special Characters only 
    it("Should Not Register Student with Password with Letters and Special Characters only", () => {
    })

// (066) Password with Numbers and Special Characters only
    it("Should Not Register Student with Password with Numbers and Special Characters only", () => {
    })

// (067) Password with Letters, Numbers and Special Characters
    it("Should Register Student with Password with Letters, Numbers and Special Characters", () => {
    })

    // (068) Should Register Student without Contract information 
    it("Should Not Register Student without Contract information", () => {
    })
// --------------------------------------------------  Teacher  --------------------------------------------------

// (069) Should Register Teacher with Valid Information
    it("Should Register Teacher with Valid Information", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Teacher', '', 'teacher@gmail.com', 'teacher');        
        cy.CreateAccount();
        // cy.contains('E-mail is required');          
    })

// (070) Should Register Teacher with Blank First Name
    it("Should Not Register Teacher with Blank First Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('blank', '', '', 'Teacher', '', 'teacher@gmail.com', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Fist name is required');          
    })

// (071) Should Register Teacher with Blank Middle Name 
    it("Should Register Teacher with Blank Middle Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', 'blank', '', 'Teacher', '', 'teacher@gmail.com', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Fist name is required');     ** Middle name is NOT required  
    })

// (072) Should Not Register Teacher with Blank Last Name
    it("Should Not Register Teacher with Blank Last Name", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', 'blank', 'Teacher', '', 'teacher@gmail.com', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Last name is required'); 
    })

// (073) Should Not Register Teacher with Blank Email
    it("Should Not Register Teacher with Blank Email", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Teacher', '', '', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Email name is required'); 
    })

// (074) Should Not Register Teacher with Blank Password
    it("Should Not Register Teacher with Blank Password", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Teacher', 'blank', '', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Password is required')
    })

// (075) Should Not Register Teacher with Blank School
    it("Should Register Teacher with Blank School", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('', '', '', 'Teacher', '', 'blank', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Email name is required')
    })

// (077) Should Register Teacher with Single Char First Name Length
    it("Should Register Teacher with Empty Char First Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('A', '', '', 'Teacher', '', '', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Fist name is required')
    })

// (078) Should Register Teacher with Empty Char First Name Length
    it("Should Register Teacher with Empty Char First Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount(' ', '', '', 'Teacher', '', '', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Fist name is required')
    })

// (079) Should Register Teacher with maximum First Name Length
    it("Should Register Teacher with Maximum First Name Length", () => {
        cy.CreateRegisterDataSet();        
        cy.AddNewAccount('FFFFFFFFFFFFFFFFFFFFFFFFF', '', '', 'Teacher', '', '', 'teacher');        
        cy.CreateAccount();
        // cy.contains('Fist name is required')
    })

// (080) Should Not Register Teacher with Exceeded Maximum First Name Length   
    it("Should Not Register Teacher with Exceeded Maximum First Name Length", () => {
    })

// (081) Should Register Teacher with minimum Middle Name Length
    it("Should Register Teacher with Minimum Middle Name Length", () => {
    })

// (082) Should Register Teacher with maximum Middle Name Length   
    it("Should Register Teacher with Maximum Middle Name Length", () => {
    })

// (083) Should Not Register Teacher with Exceeded Maximum Middle Name Length  
    it("Should Not Register Teacher with Exceeded Maximum Middle Name Length", () => {
    })

// (084) Should Register Teacher with minimum Last Name Length 
    it("Should Register Teacher with Minimum Last Name Length", () => {
    })

// (085) Should Register Teacher with maximum Last Name Length 
    it("Should Register Teacher with Maximum Last Name Length", () => {
    })

// (086) Should Not Register Teacher with Exceeded Maximum Last Name Length    
    it("Should Not Register Teacher with Exceeded Maximum Last Name Length", () => {
    })

// (087) Should Register Teacher with minimum Email Length
    it("Should Register Teacher with Minimum Email Length", () => {
    })

// (088) Should Register Teacher with maximum Email Length 
    it("Should Register Teacher with Maximum Email Length", () => {
    })

// (089) Should Not Register Teacher with Exceeded Maximum Email Length    
    it("Should Not Register Teacher with Exceeded Maximum Email Length", () => {
})

// (090) Should Register Teacher with minimum Password Length
    it("Should Register Teacher with Minimum Password Length", () => {
    })

// (091) Should Register Teacher with maximum Password Length  
    it("Should Register Teacher with Maximum Password Length", () => {
    })

// (092) Should Not Register Teacher with Exceeded Maximum Password Length
    it("Should Not Register Teacher with Exceeded Maximum Password Length", () => {

    })
