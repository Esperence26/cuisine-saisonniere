<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use App\Models\OrderItem;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'total_amount',
        'status',
        'payment_status',
        'payment_method',
        'shipping_address',
        'billing_address',
        'shipping_method',
        'shipping_cost',
        'notes'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'shipping_cost' => 'decimal:2'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function generateOrderNumber(): void
    {
        $this->order_number = 'ORD-' . date('Ymd') . '-' . str_pad($this->id, 6, '0', STR_PAD_LEFT);
        $this->save();
    }

    public function calculateTotal(): void
    {
        $total = $this->items->sum('total');
        $this->total_amount = $total + $this->shipping_cost;
        $this->save();
    }
}
