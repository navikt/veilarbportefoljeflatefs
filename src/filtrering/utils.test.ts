import { lagLablerTilVeiledereMedIdenter } from "./utils";

describe("Test lagLablerTilVeiledereMedIdenter", () => {
  it("Test when all veiledere are active", () => {
    var identer = ["A1", "A2", "A3"];
    var aktivVeiledere = [
      {
        ident: "A1",
        etternavn: "TestName 1",
        fornavn: "TestLastName 1"
      },
      {
        ident: "A2",
        etternavn: "TestName 2",
        fornavn: "TestLastName 2"
      },
      {
        ident: "A3",
        etternavn: "TestName 3",
        fornavn: "TestLastName 3"
      }
    ];
    let filteredVeileder = lagLablerTilVeiledereMedIdenter(
      identer,
      aktivVeiledere,
      () => {}
    );
    expect(filteredVeileder.length).toBe(3);
  });

  it("Test when some of veiledere are not active anymore", () => {
    var identer = ["A1", "A2", "A3"];
    var aktivVeiledere = [
      {
        ident: "A1",
        etternavn: "TestName 1",
        fornavn: "TestLastName 1"
      },
      {
        ident: "A3",
        etternavn: "TestName 3",
        fornavn: "TestLastName 3"
      }
    ];
    let filteredVeileder = lagLablerTilVeiledereMedIdenter(
      identer,
      aktivVeiledere,
      () => {}
    );
    expect(filteredVeileder.length).toBe(2);
    filteredVeileder.forEach(item => {
      expect(item.label).toBeDefined();
      expect(item.key).toBeDefined();
    });
  });

  it("Test when some of veiledere are not active anymore", () => {
    var identer = ["A1", "A2", "A3"];
    var aktivVeiledere = [
      {
        ident: "A3",
        etternavn: "TestName 3",
        fornavn: "TestLastName 3"
      }
    ];
    let filteredVeileder = lagLablerTilVeiledereMedIdenter(
      identer,
      aktivVeiledere,
      () => {}
    );
    expect(filteredVeileder.length).toBe(1);
    filteredVeileder.forEach(item => {
      expect(item.label).toBeDefined();
      expect(item.key).toBeDefined();
    });
  });
});
