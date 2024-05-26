import React from "react";
import { Modal } from "antd";
import { FormDisabledDemo } from "./AddCar";

export const AdminModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedProduct,
  deleteProduct,
  removeItem,
  editItem,
}) => {
  const handleOk = () => {
    if (deleteProduct && removeItem) {
      removeItem(deleteProduct);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={`${selectedProduct ? "" : "Delete the product"}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        >
        {selectedProduct?._id ? (
            <>
            <FormDisabledDemo
              selectedProduct={selectedProduct}
              onOk={(e) => {
                editItem(e);
                handleOk();
              }}
            />
          </>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};
