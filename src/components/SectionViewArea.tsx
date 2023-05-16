import { Customers } from "./Customers";
import { Dashboard } from "./Dashboard";
import { Employees } from "./Employees";
import { Products } from "./Products";
import { PurchaseOrders } from "./PurchaseOrders";
import { Salesorders } from "./Salesorders";
import "./SectionViewArea.css";
import { Suppliers } from "./Suppliers";

export const SectionViewArea = ({ selectedNavComponent }: { selectedNavComponent: string }) => {
  return (
    <div className="section-view-area">
      {selectedNavComponent === "Products" && <Products />}
      {selectedNavComponent === "Dashboard" && <Dashboard />}
      {selectedNavComponent === "Customers" && <Customers />}
      {selectedNavComponent === "Suppliers" && <Suppliers />}
      {selectedNavComponent === "Sales Orders" && <Salesorders />}
      {selectedNavComponent === "Purchase Orders" && <PurchaseOrders />}
      {selectedNavComponent === "Employees" && <Employees />}
    </div>
  );
};