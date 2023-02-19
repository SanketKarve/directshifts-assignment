class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
    add_column :users, :referral_code, :string, unique: true
    add_column :users, :referred_code, :string
  end
end
