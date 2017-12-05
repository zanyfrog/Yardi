import { RowSetting, YardiPropertyInfo } from '../classes/classes';

export class YardiProperty{
	Code: string;
	MarketingName: string;
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	City: string;
	State: string;
	PostalCode: string;

	//units: any;
	info: YardiPropertyInfo;
	setting: RowSetting;
}
