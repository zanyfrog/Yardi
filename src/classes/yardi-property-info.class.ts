import { YardiPropertyUnit } from '../classes/classes';

export class YardiPropertyFee{
	ProrateType: string;
	LateType: any;
	LatePercent: number;
	LateMinFee: number;
	LateFeePerDay: number;
	NonRefundableFee: number;
	AdminFee: number;
	BrokerFee: number;
}

export class YardiIndentification{
	'@IDValue': string; 
	'@IDType': string;
}

export class YardiPropertyId{
	Identification: YardiIndentification;
	//Address: YardiPropertyAddress;
}

export class YardiPropertyFloorPlan{
	Name: string;
	UnitCount: number;
	Room: {RoomType: string, Count: number, Comment: string} [];
	SquareFeet: { Min: number, Max: number};
	MarketRent: { Min: number, Max: number};
	EffectiveRent: { Min: number, Max: number};
	Fee: YardiPropertyFee;
}


export class YardiPropertyInformation{
	StructureType: any;
	UnitCount: number;
}

export class YardiPropertyInfo{
	PropertyId : YardiPropertyId;
	Information: YardiPropertyInformation;
	FloorPlan: YardiPropertyFloorPlan [];
	ILS_Unit: YardiPropertyILSUnit [];
}

export class YardiPropertyILSUnit{
	'@IDValue': string;
	Units: YardiPropertyILSUnitUnits;
	Comment: string;
	Pricing: {'MITS-OfferTerm': YardiPropertyUnitOfferTerm};
	EffectiveRent: {'@Min' : number, '@Max' : number};
	Deposit: YardiPropertyUnitDeposit;
	Fee: YardiPropertyFee;
}
export class YardiPropertyILSUnitUnits{
	Unit: YardiPropertyILSUnitUnitsUnit
}

export class YardiPropertyILSUnitUnitsUnit{
	FloorplanName : string;
	Identification : YardiIndentification;
	MarketRent: number;
	MaxSquareFeet: number;
	MinSquareFeet: number;
	UnitBathrooms: number;
	UnitBedrooms: number;
	UnitEconomicStatus: string;
	UnitLeasedStatus : string;
	UnitOccupancyStatus: string;
	UnitType: string;
}

export class YardiPropertyUnitDeposit{
	'@DepositType': string;
	Amount: {'@AmountType': string, ValueRange: {'@Exact': string}, Description: string, PercentRefundable: number, PortionRefundable: number};
}

export class YardiPropertyUnitOfferTerm{
	EffectiveRent: number;
	Term: number;
	DateRange: { StartDate: any, EndDate: any};
}