describe("App", () => {
  it("Should load welcome page with header", () => {
    cy.visit("/");
    cy.get("#header-title").should("contain", "Outlook Calendar");
    cy.get("#welc-title").should("contain", "Welcome to Calendar App");
    cy.get("#welc-desc").should("contain", "Manage your routine effectively");
    cy.get("#welc-btn").should("contain", "Access Calendar");
  });

  it("On click in the link should redirect for the calendar page", () => {
    cy.visit("/");
    cy.get("#welc-btn").click();
    cy.url().should("include", "/calendar");
    cy.get("#calendar-title").should("contain", "Calendar page");
  });

  it("Should load calendar page", () => {
    cy.visit("/calendar");
    cy.get("#calendar-title").should("contain", "Calendar page");
  });
})
