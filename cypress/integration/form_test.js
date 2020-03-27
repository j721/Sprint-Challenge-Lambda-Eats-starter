describe ("Test or inputs and submit our form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3001/");
    })
    it("Add test to inputs and submit form",function(){
        cy.get('input[name="name"]')
            .type("Julia")
            .should("have.value", "Julia");
        cy.get('input[name="sauce"]')
            .type("tomato")
            .should("have.value", "tomato");
        cy.get("textarea")
            .type("Extra thin crust")
            .should("have.value", "Extra thin crust");
        cy.get("#size")
            .select("small")
            .should("have.value", "small");
        cy.get('[type ="checkbox"]')
            .check()
            .should("be.checked");
        cy.get("button").click();
        });
});