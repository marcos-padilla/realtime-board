export type CanvasState =
	| {
			mode: CanvasMode.None
	  }
	| {
			mode: CanvasMode.SelectionNet
	  }
	| {
			mode: CanvasMode.Translating
	  }
	| {
			mode: CanvasMode.Inserting
	  }
	| {
			mode: CanvasMode.Resizing
	  }
	| {
			mode: CanvasMode.Pressing
	  }
	| {
			mode: CanvasMode.Pencil
	  }
export enum CanvasMode {
	None,
	Pressing,
	SelectionNet,
	Translating,
	Inserting,
	Resizing,
	Pencil,
}
