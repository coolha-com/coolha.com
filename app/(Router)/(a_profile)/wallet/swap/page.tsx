"use client";

import { useState } from "react";
import OkxWidget from "./OkxWidget";
import { RiChat2Line, RiInformation2Line } from "react-icons/ri";

export default function Page() {
  const [showAlert, setShowAlert] = useState(true);



  return (
    <div>

      <div className="flex flex-col items-center justify-center mx-auto  min-h-[calc(100dvh-4rem)] space-y-4">
        <OkxWidget />
      </div>

      {/* Alert 组件 */}
      {showAlert && (
        <div role="alert" className="alert alert-info fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 "
        >
          <RiInformation2Line className="stroke-info h-6 w-6 shrink-0" />
          <div className="flex items-center space-x-2">
            <span>OKX Web3 服务仅适用法律合规地区访问,请遵守当地法律法规</span>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-sm" onClick={() => setShowAlert(false)} >
              确认
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
